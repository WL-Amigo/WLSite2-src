<template>
  <div>
    <p v-for="(para, idx) in paragraphs" :key="idx" class="pb-3">
      <template v-for="(line, lidx) in para.texts">
        {{ line }}
        <br v-if="lidx + 1 < para.texts.length" :key="`${idx}-${lidx}`" />
      </template>
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

type Paragraph = {
  texts: string[];
};

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return {
      paragraphs: computed(() => {
        const text = props.text;

        const result: Paragraph[] = [];
        let currentParagraph: Paragraph = { texts: [] };
        for (const line of text.split('\n')) {
          if (line.length === 0) {
            result.push(currentParagraph);
            currentParagraph = { texts: [] };
            continue;
          }

          currentParagraph.texts.push(line);
        }
        result.push(currentParagraph);

        return result.filter(p => p.texts.length > 0);
      })
    };
  }
});
</script>
