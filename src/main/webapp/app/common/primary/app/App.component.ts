import { defineComponent, inject, ref } from "vue";
import { AuthenticationService } from '@/common/domain/AuthenticationService';
import { Logger } from '@/common/domain/Logger';
import { User } from '@/common/domain/User';
import { Router } from 'vue-router';
import { jwtStore } from '@/common/domain/JWTStoreService';

// jhipster-needle-app-import

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const appName='Jhipster-lite';
    const authenticationService = inject('authenticationService') as AuthenticationService;
const logger = inject('logger') as Logger;
const router = inject('router') as Router;

let store = jwtStore();
let isAuthenticated:boolean = store.isAuth;
let user = ref<User>({
  username: '',
  authorities: [''],
});

const onConnect = async (): Promise<void> => {
  await authenticationService
  .authenticate()
  .then(response => {
    user.value = response;
  })
  .catch(error => {
    logger.error('The token provided is not know by our service', error);
  });
}

const onLogout = async (): Promise<void> => {
  authenticationService
  .logout();
  router.push("/login");
};

// jhipster-needle-app-setup

    return {
      appName,
        user,
  isAuthenticated,
  onConnect,
  onLogout,

// jhipster-needle-app-return
    };
  },
});
