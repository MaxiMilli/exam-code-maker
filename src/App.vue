<template>
  <div id="app">
    <textarea v-model="code" class="text-area" ref="textcode" @keydown="keynumber++"></textarea><br>
    <br>
    Sprache:
    <select v-model="lang" @change="keynumber++">
      <option v-for="(lng, ind) in langs" :key="ind">{{ lng }}</option>
    </select><br><br>
    Max-Breite:
    <input type="number" v-model="maxwidth">px<br><br>
    Mit Anti-OCR:
    <select v-model="withAntiOCR" @change="keynumber++">
      <option v-for="(lng, ind) in ['kein', '1', '2', '3']" :key="ind">{{ lng }}</option>
    </select><br>


    <div class="imagearea">
      <prism :language="lang" :key="keynumber" id="codefield" :style="{ maxWidth: maxwidth + 'px', backgroundImage: backgroundUrl, backgroundSize: randomPercentage() + '%'}">
        {{ code }}
      </prism>
    </div>

    <button @click="makeImage">Make image</button>

    <br><br><br>
    <a href="https://github.com/MaxiMilli/exam-code-maker" target="_blank">Source available on GitHub.</a>
  </div>
</template>

<script>


import html2canvas from "html2canvas";
import 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import Prism from 'vue-prism-component'

export default {
  name: 'App',
  data() {
    return {
      code: "",
      lang: 'css',
      maxwidth: 600,
      langs: [
        'html',
        'css',
        'js',
        'php',
        'sql'
      ],
      keynumber: 4,
      withAntiOCR: ''
    }
  },
  components: {
    Prism
  },
  computed: {
    backgroundUrl() {
        return 'url(noise' + this.withAntiOCR + '.png)'
    }
  },
  methods: {
    makeImage() {
      if (this.lang == '') {
        alert('Sprache wählen!');
        return true;
      }

      html2canvas(document.querySelector("#codefield")).then(canvas => {

        const a = document.createElement('a');

        a.href = canvas.toDataURL('image/png', 2);
        a.download = 'exam-code-' + Math.random(300) + '.png';
        a.click()

        document.body.removeChild(a);

      });
    },
    randomPercentage() {
      let rand = Math.floor(Math.random() * 5) + 100;
      console.log(rand )
      return rand;
    }
  },
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


.imagearea {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;

  pre {
    margin: 0 auto;
    width: max-content;

    code {
      display: block;
      white-space: pre-wrap
    }
  }
}

#codefield {

  background-attachment: local;
  background-repeat: repeat;

  background-position: center;
  background-origin: padding-box
}

.text-area {
  width: 60%;
  height: 100px;
  border: black solid 1px;
}
</style>
