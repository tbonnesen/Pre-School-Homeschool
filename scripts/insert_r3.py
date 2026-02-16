#!/usr/bin/env python3
"""Insert Round 3 activities into curriculum.js for science, social, and motor domains."""

import os

BASEDIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CURRICULUM = os.path.join(BASEDIR, 'src/data/curriculum.js')

DOMAINS_TO_INSERT = ['science', 'social', 'motor']


def find_domain_close_positions(lines):
    """Find the closing bracket ], for each domain array."""
    positions = {}
    all_domains = ['letters', 'math', 'science', 'social', 'motor', 'arts']
    i = 0
    while i < len(lines):
        for domain in all_domains:
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


def main():
    # 1. Read curriculum.js
    with open(CURRICULUM, 'r') as f:
        lines = f.readlines()

    positions = find_domain_close_positions(lines)
    print(f"Domain close positions (1-indexed): { {k: v+1 for k,v in positions.items()} }")

    # 2. Load R3 content files
    r3_content = {}
    for domain in DOMAINS_TO_INSERT:
        filepath = os.path.join(BASEDIR, f'scripts/{domain}_r3.js')
        if os.path.exists(filepath):
            with open(filepath, 'r') as f:
                r3_content[domain] = f.read().strip()
            print(f"  Loaded {domain}_r3.js")
        else:
            print(f"  WARNING: {filepath} not found, skipping {domain}")

    # 3. Insert in reverse order of position (so line numbers don't shift)
    insert_list = []
    for domain, content in r3_content.items():
        if domain not in positions:
            print(f"WARNING: no position found for {domain}")
            continue
        insert_list.append((positions[domain], domain, content))

    insert_list.sort(key=lambda x: x[0], reverse=True)

    for pos, domain, content in insert_list:
        insert_text = content + "\n"
        lines.insert(pos, insert_text)
        line_count = len(content.split('\n'))
        print(f"Inserted ~{line_count} lines for '{domain}' before line {pos+1}")

    # 4. Write
    with open(CURRICULUM, 'w') as f:
        f.writelines(lines)

    print(f"\nDone! Updated {CURRICULUM}")


if __name__ == '__main__':
    main()
