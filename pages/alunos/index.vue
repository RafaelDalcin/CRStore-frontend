<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                class="ml-4 mt-4"
                large
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
                >
                Cadastrar
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="text-h5">Cadastrar aluno</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid">

                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    v-model="aluno.nome"
                                    outlined
                                    label="Nome"
                                    required
                                    placeholder="Nome"
                                    :rules="rule"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    v-model="usuario.username"
                                    outlined
                                    label="Username"
                                    required
                                    :rules="rule"
                                    placeholder="Username"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    type="password"
                                    v-model="usuario.senha"
                                    outlined
                                    label="Senha"
                                    required
                                    :rules="rule"
                                    placeholder="Senha"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    v-model="usuario.email"
                                    outlined
                                    label="E-mail"
                                    required
                                    :rules="rule"
                                    placeholder="E-mail"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    v-model="aluno.matricula"
                                    outlined
                                    label="Matrícula"
                                    required
                                    :rules="rule"
                                    placeholder="Matrícula"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    v-model="aluno.curso"
                                    outlined
                                    label="Curso"
                                    required
                                    :rules="rule"
                                    placeholder="Curso"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    v-model="aluno.semestre"
                                    outlined
                                    label="Semestre"
                                    required
                                    :rules="rule"
                                    placeholder="Semestre"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="6"
                            >
                                <v-autocomplete
                                    v-model="aluno.idGrupo"
                                    :items="grupos"
                                    item-text="descricao"
                                    item-value="id"
                                    outlined
                                    label="Grupo"
                                    required
                                    :rules="rule"
                                    placeholder="Grupo"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="limparCampos"
          >
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="adicionarAluno"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
              <v-card-title>
                Alunos
                <v-spacer></v-spacer>
                <v-text-field
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  >
                </v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="alunos"
              >
              <template v-slot:item.actions="{ item }">
                <v-icon
                  color="info"
                  small
                  class="mr-2"
                  @click="atualizar(item)"
                  >
                  mdi-pencil
                </v-icon>
                <v-icon
                  color="red"
                  small
                  @click="deletar(item)"
                  >
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    layout: 'default',
  
    data () {
      return {
        title: null,
        valid: false,

        rule: [
        v => !!v || 'Esse campo é obrigatório'
        ],
        
        aluno: {
            id: null,
            nome: null,
            matricula: null,
            curso: null,
            semestre: null,
            idGrupo: null,
            idUsuario: null,
        },

        usuario: {
            id: null,
            username: null,
            senha: null,
            email: null,
            tipo: 'aluno',
        },


        dialog: false,
        headers: [
          {
            text: 'Código',
            align: 'center',
            sortable: 'false',
            value: 'id',
          },
          {
            text: 'Grupo',
            align: 'center',
            sortable: 'false',
            value: 'grupo.descricao',
          },
          {
            text: 'Nome',
            align: 'center',
            sortable: 'false',
            value: 'nome',
          },
          {
            text: 'Username',
            align: 'center',
            sortable: 'false',
            value: 'usuario.username',
          },
          {
            text: 'Email',
            align: 'center',
            sortable: 'false',
            value: 'usuario.email',
          },
          {
              text: 'Curso',
            align: 'center',
            sortable: 'false',
            value: 'curso',
          },
          {
            text: 'Matricula',
            align: 'center',
            sortable: 'false',
            value: 'matricula',
          },

          { text: "", value: "actions" }
        ],
        alunos: [],
        grupos: [],
      }
    },
  
    created () { 
      this.getAlunos();
      this.getGrupos();

    },
    methods: {

      // Faça uma função para deletar um registro do banco de dados
      async deletar (item) {
        try {
          if (confirm(`Deseja deletar o aluno ${item.nome} ID - ${item.id}`)) {
            let response = await this.$api.post('http://localhost:3333/alunos/destroy', {id: item.id});
            await this.$api.post('http://localhost:3333/usuarios/destroy', {id: item.idUsuario});
            this.$toast.success(response.message);
            this.getAlunos();
          }
          
        } catch (error) {
          this.$toast.error('Ocorreu um erro ao deletar o registro');
        }
      },


      async limparCampos () {
          this.aluno = {
            id: null,
            nome: null,
            matricula: null,
            curso: null,
            semestre: null,
            idGrupo: null,
            idUsuario: null,
          },

          this.usuario = {
            id: null,
            username: null,
            senha: null,
            email: null,
            tipo: 'aluno',
          }
          this.valid = true;
          this.dialog = false;
          this.$refs.form.reset();
          await this.getAlunos();


      },

      async getAlunos () {
        try {

          let response = await this.$api.get('http://localhost:3333/alunos').then(res => res.data);
          this.alunos = response;

        } catch (error) {
          this.$toast.error(error.message);
        }
      },

      async getGrupos () {
        try {

          let response = await this.$api.get('http://localhost:3333/grupos').then(res => res.data);
          this.grupos = response;

        } catch (error) {
          this.$toast.error(error.message);
        }
      },

      async adicionarUsuario() {
        try {
          
          if(!this.valid) {
            return this.$toast.warning('Preencha todos os campos');
          }

          let usuario = {
            id: this.usuario.id,
            username: this.usuario.username,
            senha: this.usuario.senha,
            email: this.usuario.email,
            tipo: this.usuario.tipo,
          }

          if(!usuario.id) {
            let response = await this.$api.post('http://localhost:3333/usuarios/persist', usuario);
            if(response.type == 'success'){ 
              return response.data;
            } else {
              return this.$toast.error(response.message);
            }
          } else {
            await this.$api.post('http://localhost:3333/usuarios/persist', usuario);
            if(response.type == 'success'){
              return response.data;
            } else {
              return this.$toast.error(response.message);
            }
          }

        } catch (error) {
            return this.$toast.error(response.message);
        }
       
      },

     async atualizar(item) {
        try {
          this.dialog = true;
          await this.$api.get('http://localhost:3333/alunos/' + item.id).then(res => {
            console.log(res.data)
          });
        } catch (error) {
          
        }
      },

      async adicionarAluno () {
        try {

          if(!this.valid) {
            return this.$toast.warning('Preencha todos os campos');
          }

          let usuario = await this.adicionarUsuario();
          if(usuario.id) {

            let aluno = {
            id: this.aluno.id,
            nome: this.aluno.nome,
            matricula: this.aluno.matricula,
            curso: this.aluno.curso,
            semestre: this.aluno.semestre,
            idGrupo: this.aluno.idGrupo,
            idUsuario: usuario.id,

          }
        

        
            if(!aluno.id) {
              let response = await this.$api.post("http://localhost:3333/alunos/persist", aluno);
              if(response.type == 'success') {
                this.$toast.success(response.message);
                await this.getAlunos();
                this.dialog = false;
              } else {
                  this.$toast.error(response.message); 
              }
            } else {
                let response = await this.$api.post("http://localhost:3333/alunos/persist", aluno);
                if(response.type == 'success') {
                  this.$toast.success(response.message);
                  await this.getAlunos();
                  this.dialog = false;
                } else {
                    this.$toast.error(response.message);
                }
              }

              await this.limparCampos();
          } 
        } catch (error) {

        }
      }
     }
    }
  </script>