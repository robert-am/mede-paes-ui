<template>
    <v-card>
        <v-card-title>
            <span class="headline">Ver - Usuario</span>
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-row class="mt-4">
                    <v-col>
                        <v-text-field label="Nombres" v-model="user.firstName" readonly />
                    </v-col>
                    <v-col>
                        <v-text-field label="Apellidos" v-model="user.lastName" readonly />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                        label="Nombre de Usuario"
                        v-model="user.username"
                        readonly
                        />
                    </v-col>
                    <v-col>
                        <v-autocomplete
                        label="Roles"
                        :items="roles"
                        v-model="roles"
                        multiple
                        readonly
                        small-chips
                        item-value="id"
                        item-text="name"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                        label="Correo Electrónico"
                        v-model="user.email"
                        readonly
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <img
                        width="500px"
                        height="100px"
                        v-bind:src="user.signature"
                        alt="signature"
                        />
                    </v-col>
                </v-row>
                <v-spacer></v-spacer>
                <v-row justify="end" class="mt-4">
                    <v-btn class="ma-2" depressed color="primary" 
                        >Volver
                    </v-btn>
                </v-row>   
            </v-form>
        </v-card-text>
    </v-card> 
</template>
<script>
  export default {
    name:"UserView",
    components: {},
    
  data: () => ({
    roles: [],
    user: {
      email: "",
    },
  }),
    
  }
</script>