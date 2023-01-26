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
            Meus arquivos
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-view-module</v-icon>
          </v-btn>
          <template v-slot:extension>
          </template>
          <v-btn @click="returnFolder">Voltar</v-btn>
        </v-toolbar>
        <v-list
          two-line
          subheader
        >
          <v-list-item
            v-for="item in totalfiles"
            :key="item.name"
            @click="listaFileFolders(item)"
          >
            <GithubNavigatorFiles :item="item"/>
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
    folders: null,
    fileslist: [],
    folderslist: [],
    typefile: "",
    icon: "",
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
    updateType() {
      this.typefile = this.listaFiles.type
      if (this.typefile == 'file'){
        this.icon == 'mdi-clipboard-text'
        this.iconClass == 'grey lighten-1 white--text'
      }
      else {
        this.icon == 'mdi-folder'
        this.iconClass == 'blue white--text'
      }
    },
    async listaFileFolders(item) {
      if (item.type == "file") {
        console.log("não faz nada")
      }
      else {
        this.currentPath = item.path
        this.totalfiles = await api.listaFiles(this.repo.owner.login, this.repo.name, this.currentPath)
        this.items[1].text = item.name
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
      // for (let i=0; i < this.totalfiles.length; i++) {
      //   if (this.totalfiles[i].type == "file"){
      //     this.fileslist.push(this.totalfiles[i])
      //   }
      //   else {
      //     this.folderslist.push(this.totalfiles[i])
      //     // this.listaFileFolders()
      //   }
      // }
    },
    item () {
        this.$emit('reposelected', this.item)
  },
  currentPath (newValue, old) {
    console.log(newValue, old)
  }

// async repo(){
//       this.files = await api.listaFiles(this.repo.name)
//       this.typefile = await api.listaFiles(this.repo.type)
//         if (this.files.type == "file") {
//           this.fileslist.push(this.files.name)
//           this.icon == 'mdi-clipboard-text'
//         }
//         else {
//           this.folderslist.push(this.files.name)
//           this.icon == 'mdi-folder'

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