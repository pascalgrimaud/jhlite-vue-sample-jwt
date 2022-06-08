import { shallowMount, VueWrapper } from '@vue/test-utils';
import { AppVue } from '@/common/primary/app';
import { createTestingPinia } from '@pinia/testing';
import { AuthenticationService } from '@/common/domain/AuthenticationService';
import { stubAuthenticationService } from '../../domain/AuthenticationService.fixture';
import { stubLogger } from '../../domain/Logger.fixture';
import { Logger } from '@/common/domain/Logger';
import sinon from 'sinon';

// jhipster-needle-app-test-import

let wrapper: VueWrapper;
const $route = { path: {} };
const router = { push: sinon.stub() };

// jhipster-needle-app-test-variables

interface WrapperOptions {
      authenticationService: AuthenticationService;
    logger: Logger;

// jhipster-needle-app-test-wrapper-options
}

const wrap = (wrapperOptions?: Partial<WrapperOptions>) => {
      const { authenticationService, logger }: WrapperOptions = {
    authenticationService: stubAuthenticationService(),
    logger: stubLogger(),
    ...wrapperOptions,
    };

// jhipster-needle-app-test-wrapper-variable

  wrapper = shallowMount(AppVue,{
          global: {
    stubs: ['router-link'],
    provide: {
      authenticationService,
      logger,
      router,
    },
    plugins: [createTestingPinia({
       initialState: {
          JWTStore: {token: '123456789'},
       },
    })],
  },

// jhipster-needle-app-test-wrapper-mount
  });
};

describe('App', () => {
  it('should exist', () => {
    wrap();

    expect(wrapper.exists()).toBeTruthy();
  });

   it('should authenticate', async () => {
  const authenticationService = stubAuthenticationService();
  const logger = stubLogger();
  authenticationService.authenticate.resolves({ username: 'username', authorities: ['admin'] });
  await wrap({ authenticationService, logger });

  const clickButton = wrapper.find('#identify');
  await clickButton.trigger('click');

// @ts-ignore
expect(wrapper.vm.user).toStrictEqual({ username: 'username', authorities: ['admin'] });
});

it('Should log an error when authentication fails', async () => {
  const authenticationService = stubAuthenticationService();
  const logger = stubLogger();
  authenticationService.authenticate.rejects({});
  await wrap({ authenticationService, logger });

  const clickButton = wrapper.find('#identify');
  await clickButton.trigger('click');

    const [message] = logger.error.getCall(0).args;
    expect(message).toBe('The token provided is not know by our service');
});

  it('Should log out', async () => {
    const authenticationService = stubAuthenticationService();
    const logger = stubLogger();
    authenticationService.authenticate.resolves({ username: 'username', authorities: ['admin'] });
    await wrap({ authenticationService, logger });


    const clickButton = wrapper.find('#identify');
    await clickButton.trigger('click');
    const logoutButton = wrapper.find('#logout');
    await logoutButton.trigger('click');

    sinon.assert.calledOnce(authenticationService.logout);
  });

// jhipster-needle-app-test-routes
});
