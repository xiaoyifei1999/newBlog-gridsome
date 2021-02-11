<template>
  <Layout>
    <div class="container">
      <Hero />
      <ProjectsGrid :projects.sync="$page.projects.edges" />
    </div>
    <LatestJournals :journals="$page.journals.edges" />
  </Layout>
</template>

<page-query>
query Posts {
	projects: allStrapiPost {
    edges {
      node {
        id
        content
        date (format: "YYYY")
        title
        categories {
          title
        }
      }
    }
  },
  journals: allStrapiJournal (perPage: 4) {
    edges {
      node {
        id
        title
      }
    }
  }
}
</page-query>

<script>
import Hero from "@/components/Hero"
import ProjectsGrid from "@/components/ProjectsGrid"
import LatestJournals from "@/components/LatestJournals"

import MarkdownIf from 'markdown-it'
const md = new MarkdownIf()

export default {
  components: {
    Hero,
    ProjectsGrid,
    LatestJournals
  },
  methods: {
    getImgSrc (richtext) {
      let imgList = [];
      richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
        imgList.push(capture);
      });
      return imgList;
    }
  },
  mounted () {
    // let arr = this.$page.projects.edges
    // for (let i = 0, len = arr.length; i < len; i++) {
    //   arr[i].node.thumbnail = this.getImgSrc(md.render(arr[i].node.content))[0]
    // }
    // this.$page.projects.edges = arr
    // console.log(this.getImgSrc(md.render(this.$page.projects.edges[0].node.content)))
  }
}
</script>
