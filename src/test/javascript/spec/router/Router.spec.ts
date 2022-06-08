import { shallowMount, VueWrapper } from '@vue/test-utils';
import { AppVue } from '@/common/primary/app';
import { LoginVue } from '@/common/primary/login';
import { createTestingPinia } from '@pinia/testing';
import { AuthenticationService } from '@/common/domain/AuthenticationService';
import { stubAuthenticationService } from '../common/domain/AuthenticationService.fixture';
import { stubLogger } from '../common/domain/Logger.fixture';
import { Logger } from '@/common/domain/Logger';

// jhipster-needle-router-test-imports

import router from '@/router/router';

let wrapper: VueWrapper;

interface WrapperOptions {
  authenticationService: AuthenticationService;
logger: Logger;

// jhipster-needle-router-test-wrapper-options
}

const wrap = (wrapperOptions?: Partial<WrapperOptions>) => {
  const { authenticationService, logger }: WrapperOptions = {
    authenticationService: stubAuthenticationService(),
    logger: stubLogger(),
    ...wrapperOptions,
};

// jhipster-needle-router-test-wrapper-variable

   wrapper = shallowMount(AppVue,{
      global: {
  stubs: ['router-link'],
  provide: {
    authenticationService,
    logger,
    router,
  },
  plugins: [createTestingPinia()],
},

// jhipster-needle-router-test-wrapper-mount
      router
    });
};


describe('Router', () => {
  it('Should redirect to App by default', async () => {
    wrap();
    await router.push('/')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(AppVue)).toBeTruthy()
  })

  it('Should go to AppVue', async () => {
    wrap();
    await router.push('/app')
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(AppVue)).toBeTruthy()
  })

  it('Should go to LoginVue', async () => {
  router.push('/Login');
  await wrapper.vm.$nextTick();
  expect(wrapper.findComponent(LoginVue)).toBeTruthy();
});
afterAll(async () => new Promise(resolve => window.setTimeout(resolve, 0)));

// jhipster-needle-router-test-routes

})
