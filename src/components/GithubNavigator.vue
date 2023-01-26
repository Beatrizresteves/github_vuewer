<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      offset-sm="3"
    >
      <v-card>
        <v-toolbar
          color="#FFCC80"
          light
          extended
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title class="white--text">
            {{ title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <template v-slot:extension>
          </template> -->
          <v-btn @click="returnFolder">Voltar</v-btn>
        </v-toolbar>
        <v-list
          two-line
          
        >
          <v-list-item
            v-for="item in totalfiles"
            :key="item.name"
            @click="listaFileFolders(item)"
          >
            <GithubNavigatorFiles :item="item"/>
            <v-icon v-if="item.type==='file'"> {{ icon_file }} </v-icon>
            <v-icon v-else> {{ icon_folder }} </v-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import {api} from '~api'
import GithubNavigatorFiles from './GithubNavigatorFiles'
export default {
  components: {
      GithubNavigatorFiles
    },
  props: ['repo'],
  data: () => ({
    files: null,
    title: "Meus Arquivos",
    folders: null,
    fileslist: [],
    folderslist: [],
    icon_folder: 'mdi-folder',
    icon_file: 'mdi-clipboard-text',
    iconClass: "",
    totalfiles: [],
    currentPath: '',
    items: [
        {
          text: 'Início',
          disabled: false,
          href: null,
        },
        {
          text: '',
          disabled: false,
          href: 'breadcrumbs_link_1'
        },
        {
          text: '',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ]
  }),
	methods: {
		async listaArquivos(){
			const data = await api.lista_repos(this.user)
		},
    async listaFileFolders(item) {
      if (item.type == "file") {
        console.log("não faz nada")
      }
      else {
        this.currentPath = item.path
        this.totalfiles = await api.listaFiles(this.repo.owner.login, this.repo.name, this.currentPath)
        this.title = item.name
      }
    },
    async returnFolder(){
      this.totalfiles = await api.listaFiles(this.repo.owner.login, this.repo.name)
       // let paths = this.currentPath.split("/")
      // let updatepaths = this.paths.pop("")
      // let lastPath = updatepaths[updatepaths.length-1]
      // console.log(paths[paths.length-1])
      // // this.totalfiles = this.totalfiles.replace(lastPath, "")
      // // this.totalfiles = this.totalfiles.relice(lastPath, "")
      // this.currentPath = this.currentPath.replace(lastPath, "")
      // this.totalfiles = await api.listaFiles(this.repo.owner.login, this.repo.name, this.currentPath)
      // //this.totalfiles = await api.listaFiles(this.repo.owner.login, this.repo.name, this.currentPath[-1])
      // //let indexFolder = this.totalfiles.indexOf(this.currentPath)
      // // this.totalfiles = this.totalfiles.splice(this.item)
      // debugger
    }
	},
  watch: {
    async repo(){
      this.totalfiles = await api.listaFiles(this.repo.owner.login, this.repo.name)
    },
    item () {
        this.$emit('reposelected', this.item)
  },
  currentPath (newValue, old) {
    console.log(newValue, old)
  }

    //   return {
    //     dialog: false,
    //     items: [
    //       { icon: 'mdi-folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
    //       { icon: 'mdi-folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
    //       { icon: 'mdi-folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' },
    //     ],
    //     items2: [
    //       { icon: 'mdi-clipboard-text', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
    //       { icon: 'mdi-gesture-tap-button', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' },
    //     ],
    //   }
    // },
  }
}

</script>