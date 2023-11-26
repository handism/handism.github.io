---
title: aboutカテゴリ
description: aboutカテゴリ
next: false
prev: false
lastUpdated: false
---

# {{ $frontmatter.title }}

<script setup>
import { data as posts } from '../../.vitepress/theme/posts.data.mjs'
</script>

<ul>
    <template v-for="post of posts">
        <li v-if="post.url.startsWith('/about/')">
            <a :href="post.url">{{ post.frontmatter.title }}</a>
        </li>
    </template>
</ul>