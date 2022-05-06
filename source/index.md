---
title: Thanks for visiting my corner of the web
layout: "home.njk"
section_id: "home"
---
Congratulations! You've found my personal website. How exciting! Herein, you'll find all kinds of rubbish I've written on subjects like {% for tag in collections.tags.slice(0,10) %}[{{ tag.title | title }}](/subjects/{{ tag.title | slugify }}/){% if not loop.last %},{% endif %} {% endfor %}.

Over the last {{ collections.stats.allPosts.timespan }} I've written {{ collections.stats.allPosts.count }} posts; [{{ collections.stats.articles.count }} long-form articles](/articles/) and [{{ collections.stats.diaryPosts.count }} diary entries](/diary/).

This website is probably of little interest to anyone.