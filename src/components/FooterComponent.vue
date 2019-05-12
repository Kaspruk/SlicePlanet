<template>
    <div>
        <v-dialog v-model="modal" max-width="600px">
            <div class="dialog-content">
                <v-card v-if="modalStatus === 'registration'" class="pa-4">
                    <span class="headline">Регистрация</span>
                    <v-form ref="formRegister" v-model="registerModel" lazy-validation :key="'registerModel'">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                            label="Имя*"
                                            type="text"
                                            v-model="register.firstName"
                                            validate-on-blur
                                            :rules="[rules.checkRequired]"
                                            required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                            label="Фамилия*"
                                            type="text"
                                            v-model="register.lastName"
                                            validate-on-blur
                                            :rules="[rules.checkRequired]"
                                            required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Почта*"
                                            type="email"
                                            v-model="register.email"
                                            :error-messages="authErrorMsg"
                                            validate-on-blur
                                            :rules="[rules.checkRequired, rules.checkEmail]"
                                            required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Пароль*"
                                            type="password"
                                            v-model="register.password"
                                            validate-on-blur
                                            :rules="[rules.checkRequired, rules.checkPassword]"
                                            required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Подтвердите Пароль*"
                                            type="password"
                                            validate-on-blur
                                            :rules="[rules.checkRequired, rules.checkResetPassword]"
                                            required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-layout>
                            <v-btn color="green darken-1" @click="createUser" outline>Зарегестрироваться</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="modalStatus = 'login'" outline>Войти</v-btn>
                            <v-btn color="red darken-1" text @click="dialog = false" outline>Закрыть</v-btn>
                        </v-layout>
                    </v-form>
                </v-card>
                <v-card v-else-if="modalStatus === 'login'" class="pa-4">
                    <span class="headline">Вход</span>
                    <v-form ref="signInModel" v-model="signInModel" lazy-validation :key="'signInModel'">
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Почта*"
                                            type="mail"
                                            v-model="logIn.email"
                                            validate-on-blur
                                            :rules="[rules.checkRequired]"
                                            :error-messages="authErrorMsg"
                                            required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                            label="Пароль*"
                                            type="password"
                                            v-model="logIn.password"
                                            validate-on-blur
                                            :error-messages="authErrorMsg"
                                            :rules="[rules.checkRequired, rules.checkPassword]"
                                            required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-checkbox
                                            label="Оставаться в системе"
                                            v-model="logIn.stayLoggedIn">
                                    </v-checkbox>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-layout>
                            <v-btn color="green darken-1" @click="logInUser" type="submit" outline>Войти</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="modalStatus = 'registration'" outline>Зарегестрироваться</v-btn>
                            <v-btn color="red darken-1" text @click="dialog = false" outline>Закрыть</v-btn>
                        </v-layout>
                    </v-form>
                </v-card>
                <transition name="fade">
                    <div v-if="authSuccessMsg.length" class="successful-register">
                        <span class="green--text headline">{{authSuccessMsg}}</span>
                    </div>
                </transition>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import {EventBus} from "../event-bus";

export default {
    name: 'footer-component',
    $_veeValidate: {
        validator: 'new'
    },
    data() {
        return {
            modal: false,
            modalStatus: 'registration',
            registerModel: false,
            register: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
            authSuccessMsg: '',
            authErrorMsg: '',
            signInModel: false,
            logIn: {
                email: '',
                password: '',
                stayLoggedIn: false,
            },
            rules: {
                checkRequired: value => !!value || 'Это поле является обьязательным',
                checkEmail: (value) => {
                    const pattern = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
                    return pattern.test(value) || 'Неверный формат почты';
                },
                checkPassword: (value) => {
                    return value.length >= 5 || 'Пароль должен состоять минимум из 5 символов';
                },
                checkResetPassword: (value) => {
                    return value === (this.register.password || this.logIn.password) || 'Пароли должены совпадать';
                },
            },
        }
    },
    methods: {
        logInUser () {
            if (this.$refs.signInModel.validate()) {
                this.API.UserService.login(this.logIn.email,
                    this.logIn.password,
                    this.logIn.stayLoggedIn)
                    .then((loggedInUser) => {
                        this.$store.commit('SET_USER', loggedInUser);
                        this.authSuccessMsg = 'Вход выполнен успешно';
                        setTimeout(() => {
                            this.authSuccessMsg = '';
                            this.modal = false
                        }, 1500)
                    })
                    .catch((error) => {
                        this.authErrorMsg = error ? 'Неправильный пароль или почта' : '';
                    });
            }
        },
        createUser () {
            const user = new this.API.User();
            user.email = this.register.email;
            user.password = this.register.password;
            user.firstName = this.register.firstName;
            user.lastName = this.register.lastName;

            if (this.$refs.formRegister.validate()) {
                this.API.UserService.register(user).then(() => {
                    this.API.UserService.login(user.email,
                        user.password, true)
                        .then((loggedInUser) => {
                            this.$store.commit('SET_USER', loggedInUser);
                            this.authSuccessMsg = 'Спасибо за регистрацию';
                            setTimeout(() => {
                                this.authSuccessMsg = '';
                                this.modal = false
                            }, 1500)
                        })
                        .catch((error) => {
                            console.log(error.message);
                            console.log(error.statusCode);
                        });
                })
                    .catch((error) => {
                        this.authErrorMsg = error ? 'Пользователь с такой почтой уже зарегистрирован' : '';
                        console.log(error.message);
                        console.log(error.statusCode);
                    });
            }
        },
    },
    created() {
        EventBus.$on('open-dialog', (param) => {
            this.modal = param
        });
    }
}
</script>

<style scoped lang="sass">
.dialog-content
    width: 100%
    height: 100%
    position: relative
.successful-register
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 2
    background-color: rgba(255,255,255, 0.8)
    display: flex
    justify-content: center
    align-items: center

.fade-enter,
.fade-leave-to
    opacity: 0
    span
        transform: scale(0.5)

.fade-enter-to,
.fade-leave
    opacity: 1
    span
        transform: scale(1)

.fade-enter-active
    transition: opacity .3s ease
    span
        transition: transform .3s ease

.fade-leave-active
    transition: opacity .15s ease
    span
        transition: transform .15s ease

</style>
