#!/usr/bin/env python3
"""Insert Round 2 activities into curriculum.js for all domains."""

import re
import os

BASEDIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CURRICULUM = os.path.join(BASEDIR, 'src/data/curriculum.js')
NEW_ACTIVITIES = os.path.join(BASEDIR, 'src/data/new-activities.js')

DOMAIN_ORDER = ['letters', 'math', 'science', 'social', 'motor', 'arts']

def find_domain_close_positions(lines):
    """Find the closing bracket '], for each domain array."""
    positions = {}
    i = 0
    while i < len(lines):
        for domain in DOMAIN_ORDER:
            stripped = lines[i].strip()
            if stripped == f'{domain}: [':
                depth = 1
                j = i + 1
                while j < len(lines) and depth > 0:
                    for ch in lines[j]:
                        if ch == '[':
                            depth += 1
                        elif ch == ']':
                            depth -= 1
                            if depth == 0:
                                break
                    if depth == 0:
                        positions[domain] = j
                        break
                    j += 1
                break
        i += 1
    return positions


def parse_new_activities():
    """Parse new-activities.js, split by domain, remove domain property."""
    with open(NEW_ACTIVITIES, 'r') as f:
        content = f.read()

    # Split into activity blocks by looking for top-level { ... }, patterns
    # Each activity starts with a line that is just "{"
    blocks = []
    current_section = None
    current_block_lines = []
    in_block = False
    depth = 0

    for line in content.split('\n'):
        # Check for section comments
        section_match = re.match(r'//\s*===\s*(ARTS|LETTERS|MATH)\s+', line)
        if section_match:
            current_section = section_match.group(1).lower()
            continue

        stripped = line.strip()
        if stripped == '{' and depth == 0:
            in_block = True
            current_block_lines = [line]
            depth = 1
            continue

        if in_block:
            current_block_lines.append(line)
            for ch in line:
                if ch == '{':
                    depth += 1
                elif ch == '}':
                    depth -= 1
            if depth == 0:
                # Block complete
                block_text = '\n'.join(current_block_lines)
                # Determine domain from the domain property if section not set
                domain_match = re.search(r"domain:\s*'(\w+)'", block_text)
                domain = domain_match.group(1) if domain_match else current_section
                # Remove the domain property line
                cleaned_lines = []
                for bl in current_block_lines:
                    if re.match(r"\s*domain:\s*'[^']+'\s*,?\s*$", bl):
                        continue
                    cleaned_lines.append(bl)
                blocks.append((domain, '\n'.join(cleaned_lines)))
                in_block = False
                current_block_lines = []

    # Group by domain
    by_domain = {}
    for domain, block in blocks:
        if domain not in by_domain:
            by_domain[domain] = []
        by_domain[domain].append(block)

    return by_domain


def format_activities_for_insertion(activity_blocks, indent='    '):
    """Format activity blocks for insertion with proper indentation."""
    result_lines = []
    for block in activity_blocks:
        lines = block.split('\n')
        for line in lines:
            stripped = line.strip()
            if not stripped:
                continue
            # Re-indent: activities in the array need 4 spaces base
            if stripped == '{':
                result_lines.append(f'{indent}{{')
            elif stripped == '},':
                result_lines.append(f'{indent}}},')
            elif stripped == '}':
                result_lines.append(f'{indent}}},')
            else:
                # Preserve relative indentation
                # Count leading spaces in original
                orig_indent = len(line) - len(line.lstrip())
                # Map: 0 -> 4, 2 -> 6, 4 -> 8, etc.
                new_indent = indent + ' ' * orig_indent
                result_lines.append(f'{new_indent}{stripped}')
    return '\n'.join(result_lines)


def main():
    # 1. Read curriculum.js
    with open(CURRICULUM, 'r') as f:
        lines = f.readlines()

    positions = find_domain_close_positions(lines)
    print(f"Domain close positions (1-indexed): { {k: v+1 for k,v in positions.items()} }")

    # 2. Parse new-activities.js
    by_domain = parse_new_activities()
    for d, blocks in by_domain.items():
        print(f"  new-activities.js: {d} = {len(blocks)} activities")

    # 3. Load science and social R2 from temp files
    science_file = os.path.join(BASEDIR, 'scripts/science_r2.js')
    social_file = os.path.join(BASEDIR, 'scripts/social_r2.js')

    extra_content = {}
    for domain, filepath in [('science', science_file), ('social', social_file)]:
        if os.path.exists(filepath):
            with open(filepath, 'r') as f:
                extra_content[domain] = f.read().strip()
            print(f"  {domain}_r2.js loaded")
        else:
            print(f"  WARNING: {filepath} not found")

    # 4. Build insertion content for each domain
    insertions = {}

    # From new-activities.js (arts, letters, math)
    for domain in ['arts', 'letters', 'math']:
        if domain in by_domain:
            formatted = format_activities_for_insertion(by_domain[domain])
            insertions[domain] = formatted

    # From science_r2.js and social_r2.js
    for domain in ['science', 'social']:
        if domain in extra_content:
            insertions[domain] = extra_content[domain]

    # 5. Insert in reverse order of position
    insert_list = []
    for domain, content in insertions.items():
        if domain == 'motor':
            continue  # Skip motor
        if domain not in positions:
            print(f"WARNING: no position for {domain}")
            continue
        insert_list.append((positions[domain], domain, content))

    insert_list.sort(key=lambda x: x[0], reverse=True)

    for pos, domain, content in insert_list:
        marker = f"    // ===== ROUND 2 EXPANSION =====\n"
        insert_text = marker + content + "\n"
        lines.insert(pos, insert_text)
        line_count = len(content.split('\n'))
        print(f"Inserted ~{line_count} lines for '{domain}' before line {pos+1}")

    # 6. Write
    with open(CURRICULUM, 'w') as f:
        f.writelines(lines)

    print(f"\nDone! Updated {CURRICULUM}")


if __name__ == '__main__':
    main()
