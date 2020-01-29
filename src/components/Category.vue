<template>
  <div>
    <h3>{{ category.title }}</h3>
    <div v-for="nominee in category.nominees" :key="nominee.id">
        {{nominee.film}}
    </div>
</div>
</template>

<script>
export default {
  name: 'Category',
  props: {
    category: Object,
    vote: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
