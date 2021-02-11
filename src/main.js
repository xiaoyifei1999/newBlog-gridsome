import DefaultLayout from "~/layouts/Default.vue";
import settings from "../data/theme.json";

import "@/assets/code-highlight.css"

import MarkdownIf from 'markdown-it'
const md = new MarkdownIf()

export default function (Vue, { head }) {
  Vue.mixin({
    data () {
      return {
        GRIDSOME_API_URL: process.env.GRIDSOME_API_URL
      }
    },
    methods: {
      getImgSrc (richtext) {
        let imgList = [];
        let newText = richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
          let newStr = `<img src="${this.GRIDSOME_API_URL}${capture}" alt="" />`
          imgList.push(capture);
          return newStr
        });
        return newText;
      },
      mdToHtml (markdown) {
        return this.getImgSrc(md.render(markdown))
      }
    }
  })
  Vue.component("Layout", DefaultLayout);
  head.bodyAttrs = {
    class: settings.dark_mode ? "dark" : ""
  };
}
