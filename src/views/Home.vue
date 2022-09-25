<template>
  <div class="header-bg">
    <div class="navbar d-flex justify-center align-center">
      <div class="text-center">
         <h2>TODO</h2>
      </div>
    </div>
    <div>
      <v-list rounded>
        <v-list-item-group color="orange darken-4">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            two-line
          >
            <v-list-item-content @click="OpenEdit(item._id)">
              <v-list-item-title>
                <label>{{item.title}}</label>
              </v-list-item-title>
              <v-list-item-subtitle>
                <label>{{item.description}}</label>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <div class="d-flex justify-center align-center">
                <label>{{new Date(item.createdAt) | moment($formatDate) }}
                  <span class="time-label">({{new Date(item.createdAt) | moment($formatTime) }})</span>
                </label>
                 <v-btn
                  icon
                  @click="Deletes(item._id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    <v-footer fixed class="d-flex justify-center align-center">
      <div>
        <v-btn
          class="mx-2"
          fab
          dark
          large
          color="#FFB300"
          @click="OpenDialig"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
    </v-footer>
    <TodoModal
      @add="AddTodo"
      @edit="EditTodo"
      @close="CloseDialig"
      :dialog="isDialog"
      :header="isHeader"
      :form="isForm"
    />
  </div>

</template>

<script>
import TodoModal from '../components/modal/TodoModal'
import moment from 'moment'
export default {
  name: 'Home',
  components: {
    TodoModal
  },
  data: () => ({
    items: [],
    select: [],
    isDialog: false,
    isHeader: '',
    isForm: {
      title: '',
      description: '',
      createdAt: '',
      date: null,
      time: null
    }
  }),
  created () {
    this.GetTodoList()
  },
  methods: {
    GetTodoList () {
      this.axios.get(`${process.env.VUE_APP_DOMAIN}/todos`).then((response) => {
        if (response.status === 200) {
          this.items = response.data
        }
      })
    },
    OpenEdit (id) {
      this.isHeader = 'EDIT TASK'
      this.isDialog = true
      this.axios.get(`${process.env.VUE_APP_DOMAIN}/todos/${id}`).then((response) => {
        if (response.status === 200) {
          this.isForm = response.data
          var date = new Date(response.data.createdAt).toISOString()
          this.isForm.date = date
          this.isForm.time = moment(date).format('HH:mm')
        }
      })
    },
    AddTodo () {
      this.axios.post(`${process.env.VUE_APP_DOMAIN}/todos`, this.isForm).then((response) => {
        if (response.status === 200) {
          this.isDialog = false
          this.GetTodoList()
        }
      })
    },
    EditTodo (id) {
      this.axios.put(`${process.env.VUE_APP_DOMAIN}/todos/${id}`, this.isForm).then((response) => {
        if (response.status === 200) {
          this.isDialog = false
          this.GetTodoList()
        }
      })
    },
    OpenDialig () {
      this.isDialog = true
      this.isHeader = 'NEW TASK'
    },
    CloseDialig () {
      this.isDialog = false
    },
    Deletes (id) {
      this.axios.delete(`${process.env.VUE_APP_DOMAIN}/todos/${id}`).then((response) => {
        if (response.status === 200) {
          this.GetTodoList()
        }
      })
    }
  }
}
</script>

<style scoped>
.header-bg {
  background: linear-gradient(to right top, #FFECB3, #FFF3E0, #FFFDE7) !important;
}
.navbar {
  height: 100px;
  color: #000000;
}
.btn-list {
  position: absolute;
  top: 25px;
  right: 10px;
}
.time-label {
  font-size: 12px;
}
.theme--light.v-list {
  background: linear-gradient(to right top, #FFF59D, #FFECB3, #FFF3E0) !important;
}
.v-list{
  height:600px;/* or any height you want */
  overflow-y:auto
}
.v-footer {
  padding: 10px 16px;
  background: linear-gradient(to right top, #FFF59D, #FFECB3, #FFF3E0) !important;
}
.v-application .rounded {
    border-radius: 0px !important;
}
</style>
