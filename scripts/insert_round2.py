#!/usr/bin/env python3
"""Insert Round 2 activities into curriculum.js at the right positions."""

import sys
import os

CURRICULUM = 'src/data/curriculum.js'

# Domain array start lines (approximate, we use bracket counting)
DOMAIN_ORDER = ['letters', 'math', 'science', 'social', 'motor', 'arts']

def find_domain_close_positions(lines):
    """Find the closing bracket '],' for each domain array using bracket depth."""
    positions = {}
    i = 0
    while i < len(lines):
        for domain in DOMAIN_ORDER:
            # Match "  letters: [" or "  math: [" etc at start of domain array
            stripped = lines[i].strip()
            if stripped == f'{domain}: [':
                # Count brackets to find the matching close
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
                        positions[domain] = j  # line index of closing '],'
                        break
                    j += 1
                break
        i += 1
    return positions

def insert_content(content_files):
    """Insert content from files into curriculum.js."""
    with open(CURRICULUM, 'r') as f:
        lines = f.readlines()

    positions = find_domain_close_positions(lines)
    print(f"Found domain close positions: { {k: v+1 for k,v in positions.items()} }")  # 1-indexed for display

    # Sort insertions in reverse order so line numbers don't shift
    insertions = []
    for domain, filepath in content_files.items():
        if domain not in positions:
            print(f"WARNING: Could not find closing position for domain '{domain}'")
            continue
        if not os.path.exists(filepath):
            print(f"WARNING: File not found: {filepath}")
            continue
        with open(filepath, 'r') as f:
            content = f.read().strip()
        if not content:
            print(f"WARNING: Empty content file: {filepath}")
            continue
        insertions.append((positions[domain], domain, content))

    # Sort by position descending
    insertions.sort(key=lambda x: x[0], reverse=True)

    for pos, domain, content in insertions:
        marker = f"    // ===== ROUND 2 EXPANSION =====\n"
        insert_lines = marker + content + "\n"
        # Insert before the closing bracket
        lines.insert(pos, insert_lines)
        print(f"Inserted {len(content.splitlines())} lines for '{domain}' at line {pos+1}")

    with open(CURRICULUM, 'w') as f:
        f.writelines(lines)

    print(f"\nDone! Updated {CURRICULUM}")

if __name__ == '__main__':
    if len(sys.argv) < 3 or len(sys.argv) % 2 != 1:
        print("Usage: python3 insert_round2.py domain1 file1 [domain2 file2 ...]")
        print("Example: python3 insert_round2.py science /tmp/science_r2.js social /tmp/social_r2.js")
        sys.exit(1)

    content_files = {}
    for i in range(1, len(sys.argv), 2):
        domain = sys.argv[i]
        filepath = sys.argv[i+1]
        content_files[domain] = filepath

    insert_content(content_files)
