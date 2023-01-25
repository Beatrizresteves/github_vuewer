<template>
   <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>		
	</v-list-item-content>
</template>
<script>
export default {
	props: ['item'],
    data: () => ({
      initiallyOpen: ['public'],
	})
}
</script>
