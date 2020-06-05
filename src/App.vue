<template>
  <div id="app">
    <textarea v-model="code" class="text-area" ref="textcode"></textarea><br>
<br>
Sprache: 
    <select v-model="lang" @change="keynumber++">
      <option v-for="(lng, ind) in langs" :key="ind">{{lng}}</option>
    </select><br>
    Max-Breite:
    <input type="number" v-model="maxwidthoffield">
    <vue-code-highlight :language="lang" class="wrapper" :style="{ width: maxwidthoffield + 'px' }" :key="keynumber">
      {{code}}
    </vue-code-highlight>
    <button @click="makeImage">Make image</button>
  </div>
</template>

<script>

import { component as VueCodeHighlight } from 'vue-code-highlight';
import html2canvas from "html2canvas";
import "../node_modules/prism-es6/components/prism-php.js";

export default {
  name: 'App',
  data() {
    return {
      code: "",
      lang: '',
      maxwidthoffield: 600,
      langs: [
        'html',
        'css',
        'javascript',
        'php'
      ],
      keynumber: 4
    }
  },
  components:{
    VueCodeHighlight
  },
  methods: {
    makeImage() {
      if (this.lang == '') {
        alert('Sprache wählen!');
        return true;
      }

      html2canvas(document.querySelector(".language-javascript")).then(canvas => {
        const a = document.createElement('a');

        a.href = canvas.toDataURL('image/png', 2);
        a.download = 'exam-code-'+ Math.random(300) + '.png';
        a.click()

        document.body.removeChild(a);
          
      });
    }
  },
}
</script>

<style lang="scss">
//@import url("../node_modules/vue-code-highlight/themes/prism.css");
@import url("../node_modules/prism-es6/themes/prism.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper {
  widows: auto;
  display: flex;
  overflow: none;
  justify-content: center;
  code {
    word-wrap: break-word;
  }
}

.language-javascript {
  width: auto;
}

.text-area {
  width: 60%;
  height: 100px;
  border: black solid 1px;
}
</style>
