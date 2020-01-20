<template>
  <div>
      Vote here
      <ul v-if="categories && categories.length > 0">
      <li
        v-for="category in categories"
        :key="category.id"
      >
        {{category.title}}
        <ul>
            <li v-for="nominee in category.nominees" :key="nominee.id">
                {{nominee.film}}
            </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { GETCATEGORIES } from '../gql/queries/categories.queries';

export default {
  name: 'vote',
  components: {
    
  },
  apollo: {
      categories: {
          query: GETCATEGORIES
      }
  }
}
</script>
