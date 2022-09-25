<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-toolbar
        class="text-h5 d-flex justify-center align-center"
        light
        color="#F5F5F5"
        elevation="0"
      >
        <h3>{{header}}</h3>
        <v-btn
          class="btnclose"
          icon
          @click="close()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
          >
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <h3>Name</h3>
                <v-text-field
                  v-model="form.title"
                  placeholder="Name"
                  required
                  :rules="[v => !!v || 'Name is required']"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <h3>Description</h3>
                <v-textarea
                  v-model="form.description"
                  placeholder="Description"
                  outlined
                  rows="4"
                  :rules="[v => !!v || 'Name is required']"
                ></v-textarea>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <h3>Date</h3>
                <v-menu
                  v-model="menuDate"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="computedDateFormattedMomentjs"
                      clearable
                      readonly
                      placeholder="Date"
                      v-bind="attrs"
                      :rules="[v => !!v || 'Date is required']"
                      v-on="on"
                      @click:clear="form.date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.date"
                    @change="menuDate = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <h3>Time</h3>
                <v-menu
                  ref="menu"
                  v-model="menuTime"
                  :close-on-content-click="false"
                  :return-value.sync="form.time"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.time"
                      readonly
                      placeholder="Time"
                      :rules="[v => !!v || 'Time is required']"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menuTime"
                    v-model="form.time"
                    full-width
                    @click:minute="$refs.menu.save(form.time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center pb-5">
        <v-btn
          color="blue darken-1"
          rounded
          dark
          v-if="header === 'NEW TASK'"
          @click="add"
        >
          Add
        </v-btn>
        <v-btn
          color="blue darken-1"
          rounded
          dark
          v-if="header === 'EDIT TASK'"
          @click="edit"
        >
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    header: {
      required: true,
      type: String
    },
    dialog: {
      required: true,
      type: Boolean
    },
    form: {
      required: true,
      type: Object
    }
  },
  data: () => ({
    menuDate: false,
    menuTime: false
  }),
  computed: {
    computedDateFormattedMomentjs () {
      return this.form.date ? moment(this.form.date).format('dddd, MMMM Do YYYY') : ''
    }
  },
  methods: {
    async add () {
      if (this.$refs.form.validate()) {
        const datetime = new Date(this.form.date + ' ' + this.form.time).toISOString()
        console.log(datetime)
        this.form.createdAt = datetime
        await this.$emit('add')
        this.resetform()
      }
    },
    async edit () {
      if (this.$refs.form.validate()) {
        const newDate = moment(this.form.date).format('DD MMM YYYY')
        const newDateTime = newDate + ' ' + this.form.time
        const datetime = new Date(newDateTime).toISOString()
        this.form.createdAt = datetime
        await this.$emit('edit', this.form._id)
        this.resetform()
      }
    },
    close () {
      this.$emit('close')
      this.resetform()
    },
    resetform () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
.btnclose {
  position: absolute;
  top: 0px;
  right: -120px;
}
</style>
