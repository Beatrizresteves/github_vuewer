<template>
  <v-container>
    <GithubRepo @reposelected="onRepoSelected"/>
    <GithubIssues :repo="repo"/>
    <GithubNavigator :repo="repo"/>
  </v-container>
</template>
  
<script>
  import GithubRepo from './GithubRepo';
  import GithubIssues from './GithubIssues';
  import GithubNavigator from './GithubNavigator'
  export default {
    components: {
      GithubRepo,
      GithubIssues,
      GithubNavigator,
    },
    data: () => ({
      repo: null
    }),
    methods: {
      onRepoSelected(repo){
        this.repo = repo
      }
    }
  }
</script>
