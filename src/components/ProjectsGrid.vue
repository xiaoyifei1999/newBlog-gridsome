<template>
  <div class="projects">
    <div class="project"
         v-for="item in nList"
         :key="item.node.id">
      <g-link :to="'post/'+item.node.id"
              class="project-link">
        <g-image :src="item.node.thumbnail"
                 :alt="item.node.title"
                 class="thumbnail" />
        <h3 class="project-title">{{ item.node.title }}</h3>
        <div class="categories">
          <span class="category"
                v-for="(item, index) in item.node.categories"
                :key="index">{{ item.title }}</span>
        </div>
      </g-link>
    </div>
  </div>
</template>

<script>
import MarkdownIf from 'markdown-it'
const md = new MarkdownIf()

export default {
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      newList: []
    }
  },
  computed: {
    nList () {
      function getImgSrc (richtext) {
        let imgList = [];
        richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
          imgList.push(capture);
        });
        return imgList;
      }
      let arr = this.projects
      for (let i = 0, len = arr.length; i < len; i++) {
        arr[i].node.thumbnail = `${this.GRIDSOME_API_URL}${getImgSrc(md.render(arr[i].node.content))[0]}`
      }
      return arr
    }
  }
}
</script>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
}
.project {
  grid-column: auto / span 2;
  text-align: center;
}
.project-link {
  text-decoration: none;
}
.thumbnail {
  height: 560px;
  object-fit: cover;
  transition: all 0.15s ease;
  box-shadow: 0 0 40px -20px rgba(0, 0, 0, 0.25);
}
.project-title {
  font-size: 1rem;
  color: var(--color-contrast);
  margin: 2rem 0 1rem 0;
}
.categories {
  font-size: 0.8rem;
  color: var(--color-contrast-1);
}
.category {
  margin-right: 0.8rem;
}
.category:last-of-type {
  margin: 0;
}
.project:hover .thumbnail {
  transform: scale(1.02);
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.25);
}

@media (min-width: 920px) {
  .project {
    grid-column: auto / span 1;
  }
  .project:nth-child(3n + 1) {
    grid-column: auto / span 2;
  }
}
</style>
