import re
with open('lib/blogData.ts', 'r', encoding='utf-8') as f:
    text = f.read()
blocks = text.split('slug: ')[1:]
for i, block in enumerate(blocks):
    slug = block.split(',')[0].strip('\'"')
    match = re.search(r'content:\s*`([^`]+)`', block)
    if match:
        words = len(match.group(1).split())
        print(f'{i+1}. {slug} - {words} words')
