'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">live-music-x-monolith documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="todo.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>TODO
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminModule-5902a9f709ceb5ece29027cf60b3079f210c387deebb362436b8624d1b5044e879445d4ef36856db5ad3ffcf168ac0cfadf20ae60f2bdfa86d9ebe84b4a2887f"' : 'data-bs-target="#xs-injectables-links-module-AdminModule-5902a9f709ceb5ece29027cf60b3079f210c387deebb362436b8624d1b5044e879445d4ef36856db5ad3ffcf168ac0cfadf20ae60f2bdfa86d9ebe84b4a2887f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-5902a9f709ceb5ece29027cf60b3079f210c387deebb362436b8624d1b5044e879445d4ef36856db5ad3ffcf168ac0cfadf20ae60f2bdfa86d9ebe84b4a2887f"' :
                                        'id="xs-injectables-links-module-AdminModule-5902a9f709ceb5ece29027cf60b3079f210c387deebb362436b8624d1b5044e879445d4ef36856db5ad3ffcf168ac0cfadf20ae60f2bdfa86d9ebe84b4a2887f"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link" >ApiModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-bfe97ca86e622f1596c17746302cf907864b9f33abd53b9d0f3514dfd8202178563150e2fe8da78e0fa242546b1c8561969d693ba3f32a2dece15ebbe8f241cb"' : 'data-bs-target="#xs-controllers-links-module-AppModule-bfe97ca86e622f1596c17746302cf907864b9f33abd53b9d0f3514dfd8202178563150e2fe8da78e0fa242546b1c8561969d693ba3f32a2dece15ebbe8f241cb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-bfe97ca86e622f1596c17746302cf907864b9f33abd53b9d0f3514dfd8202178563150e2fe8da78e0fa242546b1c8561969d693ba3f32a2dece15ebbe8f241cb"' :
                                            'id="xs-controllers-links-module-AppModule-bfe97ca86e622f1596c17746302cf907864b9f33abd53b9d0f3514dfd8202178563150e2fe8da78e0fa242546b1c8561969d693ba3f32a2dece15ebbe8f241cb"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/BandsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BandsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/EventsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/MusiciansController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MusiciansController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/OrganizersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizersController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/VenuesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VenuesController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-65e0d7f51d6fcd751d72e4ec45998750975d59f409064454969958df59dcf7ccab9df412707bd2433dab8f2c1cfd89c3f2381937100e2cf0d189221ff24b447f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-65e0d7f51d6fcd751d72e4ec45998750975d59f409064454969958df59dcf7ccab9df412707bd2433dab8f2c1cfd89c3f2381937100e2cf0d189221ff24b447f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-65e0d7f51d6fcd751d72e4ec45998750975d59f409064454969958df59dcf7ccab9df412707bd2433dab8f2c1cfd89c3f2381937100e2cf0d189221ff24b447f"' :
                                            'id="xs-controllers-links-module-AuthModule-65e0d7f51d6fcd751d72e4ec45998750975d59f409064454969958df59dcf7ccab9df412707bd2433dab8f2c1cfd89c3f2381937100e2cf0d189221ff24b447f"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-65e0d7f51d6fcd751d72e4ec45998750975d59f409064454969958df59dcf7ccab9df412707bd2433dab8f2c1cfd89c3f2381937100e2cf0d189221ff24b447f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-65e0d7f51d6fcd751d72e4ec45998750975d59f409064454969958df59dcf7ccab9df412707bd2433dab8f2c1cfd89c3f2381937100e2cf0d189221ff24b447f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-65e0d7f51d6fcd751d72e4ec45998750975d59f409064454969958df59dcf7ccab9df412707bd2433dab8f2c1cfd89c3f2381937100e2cf0d189221ff24b447f"' :
                                        'id="xs-injectables-links-module-AuthModule-65e0d7f51d6fcd751d72e4ec45998750975d59f409064454969958df59dcf7ccab9df412707bd2433dab8f2c1cfd89c3f2381937100e2cf0d189221ff24b447f"' }>
                                        <li class="link">
                                            <a href="injectables/AccountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CoreAuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoreAuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CredentialsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CredentialsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-645d613b687526401719db1bf515b1fb362ece137006f63f44a53ac4fb3c0e2da51513cd4efd6adc79b4814b1b00cbd981bb0b325ed19aeafcd9378d677372cd-1"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-645d613b687526401719db1bf515b1fb362ece137006f63f44a53ac4fb3c0e2da51513cd4efd6adc79b4814b1b00cbd981bb0b325ed19aeafcd9378d677372cd-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-645d613b687526401719db1bf515b1fb362ece137006f63f44a53ac4fb3c0e2da51513cd4efd6adc79b4814b1b00cbd981bb0b325ed19aeafcd9378d677372cd-1"' :
                                        'id="xs-injectables-links-module-AuthModule-645d613b687526401719db1bf515b1fb362ece137006f63f44a53ac4fb3c0e2da51513cd4efd6adc79b4814b1b00cbd981bb0b325ed19aeafcd9378d677372cd-1"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-06d49d14785fa7d154b0e1690ed16a9c9fb3a7a6bd283102a58db89172dfab733c7f9f44544f167ac9477b3fdfbb73c3eafa46c50c5abba433a126cb80c19196-2"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-06d49d14785fa7d154b0e1690ed16a9c9fb3a7a6bd283102a58db89172dfab733c7f9f44544f167ac9477b3fdfbb73c3eafa46c50c5abba433a126cb80c19196-2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-06d49d14785fa7d154b0e1690ed16a9c9fb3a7a6bd283102a58db89172dfab733c7f9f44544f167ac9477b3fdfbb73c3eafa46c50c5abba433a126cb80c19196-2"' :
                                            'id="xs-controllers-links-module-AuthModule-06d49d14785fa7d154b0e1690ed16a9c9fb3a7a6bd283102a58db89172dfab733c7f9f44544f167ac9477b3fdfbb73c3eafa46c50c5abba433a126cb80c19196-2"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-06d49d14785fa7d154b0e1690ed16a9c9fb3a7a6bd283102a58db89172dfab733c7f9f44544f167ac9477b3fdfbb73c3eafa46c50c5abba433a126cb80c19196-2"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-06d49d14785fa7d154b0e1690ed16a9c9fb3a7a6bd283102a58db89172dfab733c7f9f44544f167ac9477b3fdfbb73c3eafa46c50c5abba433a126cb80c19196-2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-06d49d14785fa7d154b0e1690ed16a9c9fb3a7a6bd283102a58db89172dfab733c7f9f44544f167ac9477b3fdfbb73c3eafa46c50c5abba433a126cb80c19196-2"' :
                                        'id="xs-injectables-links-module-AuthModule-06d49d14785fa7d154b0e1690ed16a9c9fb3a7a6bd283102a58db89172dfab733c7f9f44544f167ac9477b3fdfbb73c3eafa46c50c5abba433a126cb80c19196-2"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BandsModule.html" data-type="entity-link" >BandsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BandsModule-2cd7cc8c36fb1f8f3e26b335a9c9499d30de1cdd21aeb4084470a8318e6ad77514af19c31fc1ee3fe615f7bb3dd89732b02d219768601af19e6ebc4933af8f46"' : 'data-bs-target="#xs-controllers-links-module-BandsModule-2cd7cc8c36fb1f8f3e26b335a9c9499d30de1cdd21aeb4084470a8318e6ad77514af19c31fc1ee3fe615f7bb3dd89732b02d219768601af19e6ebc4933af8f46"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BandsModule-2cd7cc8c36fb1f8f3e26b335a9c9499d30de1cdd21aeb4084470a8318e6ad77514af19c31fc1ee3fe615f7bb3dd89732b02d219768601af19e6ebc4933af8f46"' :
                                            'id="xs-controllers-links-module-BandsModule-2cd7cc8c36fb1f8f3e26b335a9c9499d30de1cdd21aeb4084470a8318e6ad77514af19c31fc1ee3fe615f7bb3dd89732b02d219768601af19e6ebc4933af8f46"' }>
                                            <li class="link">
                                                <a href="controllers/BandsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BandsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BandsModule-2cd7cc8c36fb1f8f3e26b335a9c9499d30de1cdd21aeb4084470a8318e6ad77514af19c31fc1ee3fe615f7bb3dd89732b02d219768601af19e6ebc4933af8f46"' : 'data-bs-target="#xs-injectables-links-module-BandsModule-2cd7cc8c36fb1f8f3e26b335a9c9499d30de1cdd21aeb4084470a8318e6ad77514af19c31fc1ee3fe615f7bb3dd89732b02d219768601af19e6ebc4933af8f46"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BandsModule-2cd7cc8c36fb1f8f3e26b335a9c9499d30de1cdd21aeb4084470a8318e6ad77514af19c31fc1ee3fe615f7bb3dd89732b02d219768601af19e6ebc4933af8f46"' :
                                        'id="xs-injectables-links-module-BandsModule-2cd7cc8c36fb1f8f3e26b335a9c9499d30de1cdd21aeb4084470a8318e6ad77514af19c31fc1ee3fe615f7bb3dd89732b02d219768601af19e6ebc4933af8f46"' }>
                                        <li class="link">
                                            <a href="injectables/BandsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BandsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatModule.html" data-type="entity-link" >ChatModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ChatModule-4e7e88c5ad03ba1c2c21a3ef799ba7fdfc8958013d96a693cd0ce9e94dc09afd53266bc01158fdd8fb6f716b4e45740d96bc302b78d3af784cce16b8986eed59"' : 'data-bs-target="#xs-controllers-links-module-ChatModule-4e7e88c5ad03ba1c2c21a3ef799ba7fdfc8958013d96a693cd0ce9e94dc09afd53266bc01158fdd8fb6f716b4e45740d96bc302b78d3af784cce16b8986eed59"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChatModule-4e7e88c5ad03ba1c2c21a3ef799ba7fdfc8958013d96a693cd0ce9e94dc09afd53266bc01158fdd8fb6f716b4e45740d96bc302b78d3af784cce16b8986eed59"' :
                                            'id="xs-controllers-links-module-ChatModule-4e7e88c5ad03ba1c2c21a3ef799ba7fdfc8958013d96a693cd0ce9e94dc09afd53266bc01158fdd8fb6f716b4e45740d96bc302b78d3af784cce16b8986eed59"' }>
                                            <li class="link">
                                                <a href="controllers/ChatController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChatModule-4e7e88c5ad03ba1c2c21a3ef799ba7fdfc8958013d96a693cd0ce9e94dc09afd53266bc01158fdd8fb6f716b4e45740d96bc302b78d3af784cce16b8986eed59"' : 'data-bs-target="#xs-injectables-links-module-ChatModule-4e7e88c5ad03ba1c2c21a3ef799ba7fdfc8958013d96a693cd0ce9e94dc09afd53266bc01158fdd8fb6f716b4e45740d96bc302b78d3af784cce16b8986eed59"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChatModule-4e7e88c5ad03ba1c2c21a3ef799ba7fdfc8958013d96a693cd0ce9e94dc09afd53266bc01158fdd8fb6f716b4e45740d96bc302b78d3af784cce16b8986eed59"' :
                                        'id="xs-injectables-links-module-ChatModule-4e7e88c5ad03ba1c2c21a3ef799ba7fdfc8958013d96a693cd0ce9e94dc09afd53266bc01158fdd8fb6f716b4e45740d96bc302b78d3af784cce16b8986eed59"' }>
                                        <li class="link">
                                            <a href="injectables/ChatService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConnectionModule.html" data-type="entity-link" >ConnectionModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConnectionModule.html" data-type="entity-link" >ConnectionModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ConnectionModule-120a4a962c014e2e70e499cde38bf435a91be909d9d242c057d917ab0d554f8805ac527790a81974657a3ba8b0740d7aca5b0b749e196492849ed3e850f5302b-1"' : 'data-bs-target="#xs-injectables-links-module-ConnectionModule-120a4a962c014e2e70e499cde38bf435a91be909d9d242c057d917ab0d554f8805ac527790a81974657a3ba8b0740d7aca5b0b749e196492849ed3e850f5302b-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConnectionModule-120a4a962c014e2e70e499cde38bf435a91be909d9d242c057d917ab0d554f8805ac527790a81974657a3ba8b0740d7aca5b0b749e196492849ed3e850f5302b-1"' :
                                        'id="xs-injectables-links-module-ConnectionModule-120a4a962c014e2e70e499cde38bf435a91be909d9d242c057d917ab0d554f8805ac527790a81974657a3ba8b0740d7aca5b0b749e196492849ed3e850f5302b-1"' }>
                                        <li class="link">
                                            <a href="injectables/ConnectionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConnectionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConnectionModule.html" data-type="entity-link" >ConnectionModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ContentModule.html" data-type="entity-link" >ContentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ContentModule-1abafdc16ad0096c50a2322fb1d40e98a237bf4087bd8449e2a692be489e4fd4ba1a94c7e9e2fea70bb25ea713b150bf4f9a0a0a753e2507823c55bf82c594bb"' : 'data-bs-target="#xs-controllers-links-module-ContentModule-1abafdc16ad0096c50a2322fb1d40e98a237bf4087bd8449e2a692be489e4fd4ba1a94c7e9e2fea70bb25ea713b150bf4f9a0a0a753e2507823c55bf82c594bb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ContentModule-1abafdc16ad0096c50a2322fb1d40e98a237bf4087bd8449e2a692be489e4fd4ba1a94c7e9e2fea70bb25ea713b150bf4f9a0a0a753e2507823c55bf82c594bb"' :
                                            'id="xs-controllers-links-module-ContentModule-1abafdc16ad0096c50a2322fb1d40e98a237bf4087bd8449e2a692be489e4fd4ba1a94c7e9e2fea70bb25ea713b150bf4f9a0a0a753e2507823c55bf82c594bb"' }>
                                            <li class="link">
                                                <a href="controllers/ContentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ContentModule-1abafdc16ad0096c50a2322fb1d40e98a237bf4087bd8449e2a692be489e4fd4ba1a94c7e9e2fea70bb25ea713b150bf4f9a0a0a753e2507823c55bf82c594bb"' : 'data-bs-target="#xs-injectables-links-module-ContentModule-1abafdc16ad0096c50a2322fb1d40e98a237bf4087bd8449e2a692be489e4fd4ba1a94c7e9e2fea70bb25ea713b150bf4f9a0a0a753e2507823c55bf82c594bb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ContentModule-1abafdc16ad0096c50a2322fb1d40e98a237bf4087bd8449e2a692be489e4fd4ba1a94c7e9e2fea70bb25ea713b150bf4f9a0a0a753e2507823c55bf82c594bb"' :
                                        'id="xs-injectables-links-module-ContentModule-1abafdc16ad0096c50a2322fb1d40e98a237bf4087bd8449e2a692be489e4fd4ba1a94c7e9e2fea70bb25ea713b150bf4f9a0a0a753e2507823c55bf82c594bb"' }>
                                        <li class="link">
                                            <a href="injectables/ContentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventsModule.html" data-type="entity-link" >EventsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EventsModule-756bdf745065bf2cf9b4c1d9854aec0447fc3f4fad3bcf30fd1425732b37349005bed7036696bdcef2a5153254242403e3ef527e595b45cce76c8e74567a726d"' : 'data-bs-target="#xs-controllers-links-module-EventsModule-756bdf745065bf2cf9b4c1d9854aec0447fc3f4fad3bcf30fd1425732b37349005bed7036696bdcef2a5153254242403e3ef527e595b45cce76c8e74567a726d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EventsModule-756bdf745065bf2cf9b4c1d9854aec0447fc3f4fad3bcf30fd1425732b37349005bed7036696bdcef2a5153254242403e3ef527e595b45cce76c8e74567a726d"' :
                                            'id="xs-controllers-links-module-EventsModule-756bdf745065bf2cf9b4c1d9854aec0447fc3f4fad3bcf30fd1425732b37349005bed7036696bdcef2a5153254242403e3ef527e595b45cce76c8e74567a726d"' }>
                                            <li class="link">
                                                <a href="controllers/EventsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EventsModule-756bdf745065bf2cf9b4c1d9854aec0447fc3f4fad3bcf30fd1425732b37349005bed7036696bdcef2a5153254242403e3ef527e595b45cce76c8e74567a726d"' : 'data-bs-target="#xs-injectables-links-module-EventsModule-756bdf745065bf2cf9b4c1d9854aec0447fc3f4fad3bcf30fd1425732b37349005bed7036696bdcef2a5153254242403e3ef527e595b45cce76c8e74567a726d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventsModule-756bdf745065bf2cf9b4c1d9854aec0447fc3f4fad3bcf30fd1425732b37349005bed7036696bdcef2a5153254242403e3ef527e595b45cce76c8e74567a726d"' :
                                        'id="xs-injectables-links-module-EventsModule-756bdf745065bf2cf9b4c1d9854aec0447fc3f4fad3bcf30fd1425732b37349005bed7036696bdcef2a5153254242403e3ef527e595b45cce76c8e74567a726d"' }>
                                        <li class="link">
                                            <a href="injectables/EventsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventsModule.html" data-type="entity-link" >EventsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EventsModule-5ddf0f942883a9fadc41414c53686e73cc9b4c0c7b3bc8b9ab04497af705beae0da0e79073fd0094ef08792e54352641b2778e93ca28cc7471ddd2320094cdb7-1"' : 'data-bs-target="#xs-injectables-links-module-EventsModule-5ddf0f942883a9fadc41414c53686e73cc9b4c0c7b3bc8b9ab04497af705beae0da0e79073fd0094ef08792e54352641b2778e93ca28cc7471ddd2320094cdb7-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventsModule-5ddf0f942883a9fadc41414c53686e73cc9b4c0c7b3bc8b9ab04497af705beae0da0e79073fd0094ef08792e54352641b2778e93ca28cc7471ddd2320094cdb7-1"' :
                                        'id="xs-injectables-links-module-EventsModule-5ddf0f942883a9fadc41414c53686e73cc9b4c0c7b3bc8b9ab04497af705beae0da0e79073fd0094ef08792e54352641b2778e93ca28cc7471ddd2320094cdb7-1"' }>
                                        <li class="link">
                                            <a href="injectables/EventsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventsModule.html" data-type="entity-link" >EventsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-EventsModule-0f2b377ca26ff27ae69d1a80f5b51734a45699663e7948f9e8b82a6b0154ba110048ad5da47ac9f0dab3e066a1139afdec09e3cdc5401a3200604561ccbeb1d4-2"' : 'data-bs-target="#xs-controllers-links-module-EventsModule-0f2b377ca26ff27ae69d1a80f5b51734a45699663e7948f9e8b82a6b0154ba110048ad5da47ac9f0dab3e066a1139afdec09e3cdc5401a3200604561ccbeb1d4-2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EventsModule-0f2b377ca26ff27ae69d1a80f5b51734a45699663e7948f9e8b82a6b0154ba110048ad5da47ac9f0dab3e066a1139afdec09e3cdc5401a3200604561ccbeb1d4-2"' :
                                            'id="xs-controllers-links-module-EventsModule-0f2b377ca26ff27ae69d1a80f5b51734a45699663e7948f9e8b82a6b0154ba110048ad5da47ac9f0dab3e066a1139afdec09e3cdc5401a3200604561ccbeb1d4-2"' }>
                                            <li class="link">
                                                <a href="controllers/EventsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EventsModule-0f2b377ca26ff27ae69d1a80f5b51734a45699663e7948f9e8b82a6b0154ba110048ad5da47ac9f0dab3e066a1139afdec09e3cdc5401a3200604561ccbeb1d4-2"' : 'data-bs-target="#xs-injectables-links-module-EventsModule-0f2b377ca26ff27ae69d1a80f5b51734a45699663e7948f9e8b82a6b0154ba110048ad5da47ac9f0dab3e066a1139afdec09e3cdc5401a3200604561ccbeb1d4-2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventsModule-0f2b377ca26ff27ae69d1a80f5b51734a45699663e7948f9e8b82a6b0154ba110048ad5da47ac9f0dab3e066a1139afdec09e3cdc5401a3200604561ccbeb1d4-2"' :
                                        'id="xs-injectables-links-module-EventsModule-0f2b377ca26ff27ae69d1a80f5b51734a45699663e7948f9e8b82a6b0154ba110048ad5da47ac9f0dab3e066a1139afdec09e3cdc5401a3200604561ccbeb1d4-2"' }>
                                        <li class="link">
                                            <a href="injectables/EventsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GraphqlModule.html" data-type="entity-link" >GraphqlModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GraphqlModule-b4a8c4c9aa6542b53bb8e48bc2b7936bae29e67de720d385ff44c68caeb163aee1ebfd7ab1fa1c24581f53ff90695f870d6b3e883deda547b81a0a527d31636d"' : 'data-bs-target="#xs-controllers-links-module-GraphqlModule-b4a8c4c9aa6542b53bb8e48bc2b7936bae29e67de720d385ff44c68caeb163aee1ebfd7ab1fa1c24581f53ff90695f870d6b3e883deda547b81a0a527d31636d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GraphqlModule-b4a8c4c9aa6542b53bb8e48bc2b7936bae29e67de720d385ff44c68caeb163aee1ebfd7ab1fa1c24581f53ff90695f870d6b3e883deda547b81a0a527d31636d"' :
                                            'id="xs-controllers-links-module-GraphqlModule-b4a8c4c9aa6542b53bb8e48bc2b7936bae29e67de720d385ff44c68caeb163aee1ebfd7ab1fa1c24581f53ff90695f870d6b3e883deda547b81a0a527d31636d"' }>
                                            <li class="link">
                                                <a href="controllers/GraphqlController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GraphqlController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GraphqlModule-b4a8c4c9aa6542b53bb8e48bc2b7936bae29e67de720d385ff44c68caeb163aee1ebfd7ab1fa1c24581f53ff90695f870d6b3e883deda547b81a0a527d31636d"' : 'data-bs-target="#xs-injectables-links-module-GraphqlModule-b4a8c4c9aa6542b53bb8e48bc2b7936bae29e67de720d385ff44c68caeb163aee1ebfd7ab1fa1c24581f53ff90695f870d6b3e883deda547b81a0a527d31636d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GraphqlModule-b4a8c4c9aa6542b53bb8e48bc2b7936bae29e67de720d385ff44c68caeb163aee1ebfd7ab1fa1c24581f53ff90695f870d6b3e883deda547b81a0a527d31636d"' :
                                        'id="xs-injectables-links-module-GraphqlModule-b4a8c4c9aa6542b53bb8e48bc2b7936bae29e67de720d385ff44c68caeb163aee1ebfd7ab1fa1c24581f53ff90695f870d6b3e883deda547b81a0a527d31636d"' }>
                                        <li class="link">
                                            <a href="injectables/GraphqlService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GraphqlService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GuardsModule.html" data-type="entity-link" >GuardsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LocationsModule.html" data-type="entity-link" >LocationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LocationsModule-1c60100312ba988d53de5d26e3b2bb2a9fc00e9ed82b02dbf12c871c25c15d0036f18157c4b46656505abc3139403280f0f1d9ec29b09416d005feef7b0c5a28"' : 'data-bs-target="#xs-controllers-links-module-LocationsModule-1c60100312ba988d53de5d26e3b2bb2a9fc00e9ed82b02dbf12c871c25c15d0036f18157c4b46656505abc3139403280f0f1d9ec29b09416d005feef7b0c5a28"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LocationsModule-1c60100312ba988d53de5d26e3b2bb2a9fc00e9ed82b02dbf12c871c25c15d0036f18157c4b46656505abc3139403280f0f1d9ec29b09416d005feef7b0c5a28"' :
                                            'id="xs-controllers-links-module-LocationsModule-1c60100312ba988d53de5d26e3b2bb2a9fc00e9ed82b02dbf12c871c25c15d0036f18157c4b46656505abc3139403280f0f1d9ec29b09416d005feef7b0c5a28"' }>
                                            <li class="link">
                                                <a href="controllers/LocationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LocationsModule-1c60100312ba988d53de5d26e3b2bb2a9fc00e9ed82b02dbf12c871c25c15d0036f18157c4b46656505abc3139403280f0f1d9ec29b09416d005feef7b0c5a28"' : 'data-bs-target="#xs-injectables-links-module-LocationsModule-1c60100312ba988d53de5d26e3b2bb2a9fc00e9ed82b02dbf12c871c25c15d0036f18157c4b46656505abc3139403280f0f1d9ec29b09416d005feef7b0c5a28"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LocationsModule-1c60100312ba988d53de5d26e3b2bb2a9fc00e9ed82b02dbf12c871c25c15d0036f18157c4b46656505abc3139403280f0f1d9ec29b09416d005feef7b0c5a28"' :
                                        'id="xs-injectables-links-module-LocationsModule-1c60100312ba988d53de5d26e3b2bb2a9fc00e9ed82b02dbf12c871c25c15d0036f18157c4b46656505abc3139403280f0f1d9ec29b09416d005feef7b0c5a28"' }>
                                        <li class="link">
                                            <a href="injectables/LocationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LocationsModule.html" data-type="entity-link" >LocationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LocationsModule-e457180b9ad5c2e27de3ef9cee343f45ec5b41abdfa2ef229452e857d44a1a4c9f60c05f6141f573586c9ae7eb3b5a41fda1f20b16e1cc094a6b6c2a2733e31c-1"' : 'data-bs-target="#xs-controllers-links-module-LocationsModule-e457180b9ad5c2e27de3ef9cee343f45ec5b41abdfa2ef229452e857d44a1a4c9f60c05f6141f573586c9ae7eb3b5a41fda1f20b16e1cc094a6b6c2a2733e31c-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LocationsModule-e457180b9ad5c2e27de3ef9cee343f45ec5b41abdfa2ef229452e857d44a1a4c9f60c05f6141f573586c9ae7eb3b5a41fda1f20b16e1cc094a6b6c2a2733e31c-1"' :
                                            'id="xs-controllers-links-module-LocationsModule-e457180b9ad5c2e27de3ef9cee343f45ec5b41abdfa2ef229452e857d44a1a4c9f60c05f6141f573586c9ae7eb3b5a41fda1f20b16e1cc094a6b6c2a2733e31c-1"' }>
                                            <li class="link">
                                                <a href="controllers/LocationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LocationsModule-e457180b9ad5c2e27de3ef9cee343f45ec5b41abdfa2ef229452e857d44a1a4c9f60c05f6141f573586c9ae7eb3b5a41fda1f20b16e1cc094a6b6c2a2733e31c-1"' : 'data-bs-target="#xs-injectables-links-module-LocationsModule-e457180b9ad5c2e27de3ef9cee343f45ec5b41abdfa2ef229452e857d44a1a4c9f60c05f6141f573586c9ae7eb3b5a41fda1f20b16e1cc094a6b6c2a2733e31c-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LocationsModule-e457180b9ad5c2e27de3ef9cee343f45ec5b41abdfa2ef229452e857d44a1a4c9f60c05f6141f573586c9ae7eb3b5a41fda1f20b16e1cc094a6b6c2a2733e31c-1"' :
                                        'id="xs-injectables-links-module-LocationsModule-e457180b9ad5c2e27de3ef9cee343f45ec5b41abdfa2ef229452e857d44a1a4c9f60c05f6141f573586c9ae7eb3b5a41fda1f20b16e1cc094a6b6c2a2733e31c-1"' }>
                                        <li class="link">
                                            <a href="injectables/LocationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MediaModule.html" data-type="entity-link" >MediaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a"' : 'data-bs-target="#xs-controllers-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a"' :
                                            'id="xs-controllers-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a"' }>
                                            <li class="link">
                                                <a href="controllers/MediaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MediaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a"' : 'data-bs-target="#xs-injectables-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a"' :
                                        'id="xs-injectables-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a"' }>
                                        <li class="link">
                                            <a href="injectables/MediaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MediaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MediaModule.html" data-type="entity-link" >MediaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a-1"' : 'data-bs-target="#xs-controllers-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a-1"' :
                                            'id="xs-controllers-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a-1"' }>
                                            <li class="link">
                                                <a href="controllers/MediaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MediaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a-1"' : 'data-bs-target="#xs-injectables-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a-1"' :
                                        'id="xs-injectables-links-module-MediaModule-21fb48c39ba9fb29c6430c848fc182287999410199d329d0dd9def2407ace76934a0017ba24ba8f3577e0b5d19823efb3a062532e58c9197692dfe95988dbf4a-1"' }>
                                        <li class="link">
                                            <a href="injectables/MediaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MediaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessagingModule.html" data-type="entity-link" >MessagingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MessagingModule-4922385a96d0c51ff7b0eb36469df607e9806437e42a45da8037cdabf32bf878a0ac25966e1fee632e60703ef07ea5ce0f0efb20042511b7b6d1c6dfbc124ee2"' : 'data-bs-target="#xs-injectables-links-module-MessagingModule-4922385a96d0c51ff7b0eb36469df607e9806437e42a45da8037cdabf32bf878a0ac25966e1fee632e60703ef07ea5ce0f0efb20042511b7b6d1c6dfbc124ee2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessagingModule-4922385a96d0c51ff7b0eb36469df607e9806437e42a45da8037cdabf32bf878a0ac25966e1fee632e60703ef07ea5ce0f0efb20042511b7b6d1c6dfbc124ee2"' :
                                        'id="xs-injectables-links-module-MessagingModule-4922385a96d0c51ff7b0eb36469df607e9806437e42a45da8037cdabf32bf878a0ac25966e1fee632e60703ef07ea5ce0f0efb20042511b7b6d1c6dfbc124ee2"' }>
                                        <li class="link">
                                            <a href="injectables/MessagingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessagingModule.html" data-type="entity-link" >MessagingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MessagingModule-932118c1f568b2dd5cd3d07cabeeaef3f37c59cc2180cbfeac001e5be403224623589184078af8acbd9a8c7a0960c0412879fcab297214936605382c91d3f682-1"' : 'data-bs-target="#xs-injectables-links-module-MessagingModule-932118c1f568b2dd5cd3d07cabeeaef3f37c59cc2180cbfeac001e5be403224623589184078af8acbd9a8c7a0960c0412879fcab297214936605382c91d3f682-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessagingModule-932118c1f568b2dd5cd3d07cabeeaef3f37c59cc2180cbfeac001e5be403224623589184078af8acbd9a8c7a0960c0412879fcab297214936605382c91d3f682-1"' :
                                        'id="xs-injectables-links-module-MessagingModule-932118c1f568b2dd5cd3d07cabeeaef3f37c59cc2180cbfeac001e5be403224623589184078af8acbd9a8c7a0960c0412879fcab297214936605382c91d3f682-1"' }>
                                        <li class="link">
                                            <a href="injectables/MessagingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MusiciansModule.html" data-type="entity-link" >MusiciansModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MusiciansModule-4a761b2abb2337f3fa6c646a5fdd76c82b3fd1c2eba10ecf0aa4e66d27210930b21d2b9f789a9909b5b6cd47923088f56d161b6811d413920b94a6d66b8839c6"' : 'data-bs-target="#xs-controllers-links-module-MusiciansModule-4a761b2abb2337f3fa6c646a5fdd76c82b3fd1c2eba10ecf0aa4e66d27210930b21d2b9f789a9909b5b6cd47923088f56d161b6811d413920b94a6d66b8839c6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MusiciansModule-4a761b2abb2337f3fa6c646a5fdd76c82b3fd1c2eba10ecf0aa4e66d27210930b21d2b9f789a9909b5b6cd47923088f56d161b6811d413920b94a6d66b8839c6"' :
                                            'id="xs-controllers-links-module-MusiciansModule-4a761b2abb2337f3fa6c646a5fdd76c82b3fd1c2eba10ecf0aa4e66d27210930b21d2b9f789a9909b5b6cd47923088f56d161b6811d413920b94a6d66b8839c6"' }>
                                            <li class="link">
                                                <a href="controllers/MusiciansController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MusiciansController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MusiciansModule-4a761b2abb2337f3fa6c646a5fdd76c82b3fd1c2eba10ecf0aa4e66d27210930b21d2b9f789a9909b5b6cd47923088f56d161b6811d413920b94a6d66b8839c6"' : 'data-bs-target="#xs-injectables-links-module-MusiciansModule-4a761b2abb2337f3fa6c646a5fdd76c82b3fd1c2eba10ecf0aa4e66d27210930b21d2b9f789a9909b5b6cd47923088f56d161b6811d413920b94a6d66b8839c6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MusiciansModule-4a761b2abb2337f3fa6c646a5fdd76c82b3fd1c2eba10ecf0aa4e66d27210930b21d2b9f789a9909b5b6cd47923088f56d161b6811d413920b94a6d66b8839c6"' :
                                        'id="xs-injectables-links-module-MusiciansModule-4a761b2abb2337f3fa6c646a5fdd76c82b3fd1c2eba10ecf0aa4e66d27210930b21d2b9f789a9909b5b6cd47923088f56d161b6811d413920b94a6d66b8839c6"' }>
                                        <li class="link">
                                            <a href="injectables/MusiciansService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MusiciansService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NetworksModule.html" data-type="entity-link" >NetworksModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NetworksModule-74cb7273e300671b2ce7935a3cc96159e206b0184846089b03c31cc93e7fcd0c657a1baacdccdafd00bfd4978c1dbab6f884d69f94e14a44d9c5bf96ec6c6a66"' : 'data-bs-target="#xs-injectables-links-module-NetworksModule-74cb7273e300671b2ce7935a3cc96159e206b0184846089b03c31cc93e7fcd0c657a1baacdccdafd00bfd4978c1dbab6f884d69f94e14a44d9c5bf96ec6c6a66"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NetworksModule-74cb7273e300671b2ce7935a3cc96159e206b0184846089b03c31cc93e7fcd0c657a1baacdccdafd00bfd4978c1dbab6f884d69f94e14a44d9c5bf96ec6c6a66"' :
                                        'id="xs-injectables-links-module-NetworksModule-74cb7273e300671b2ce7935a3cc96159e206b0184846089b03c31cc93e7fcd0c657a1baacdccdafd00bfd4978c1dbab6f884d69f94e14a44d9c5bf96ec6c6a66"' }>
                                        <li class="link">
                                            <a href="injectables/NetworksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NetworksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationModule.html" data-type="entity-link" >NotificationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NotificationModule-7eebe90ca8f6fb4d9c8230f609008bc047495553b8ebd7a85df9ebc5bf01dfed371ba348f6fbfc106252e2db5689c88fd88ff03526636cd0af83caf359aab2d3"' : 'data-bs-target="#xs-controllers-links-module-NotificationModule-7eebe90ca8f6fb4d9c8230f609008bc047495553b8ebd7a85df9ebc5bf01dfed371ba348f6fbfc106252e2db5689c88fd88ff03526636cd0af83caf359aab2d3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotificationModule-7eebe90ca8f6fb4d9c8230f609008bc047495553b8ebd7a85df9ebc5bf01dfed371ba348f6fbfc106252e2db5689c88fd88ff03526636cd0af83caf359aab2d3"' :
                                            'id="xs-controllers-links-module-NotificationModule-7eebe90ca8f6fb4d9c8230f609008bc047495553b8ebd7a85df9ebc5bf01dfed371ba348f6fbfc106252e2db5689c88fd88ff03526636cd0af83caf359aab2d3"' }>
                                            <li class="link">
                                                <a href="controllers/NotificationController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotificationModule-7eebe90ca8f6fb4d9c8230f609008bc047495553b8ebd7a85df9ebc5bf01dfed371ba348f6fbfc106252e2db5689c88fd88ff03526636cd0af83caf359aab2d3"' : 'data-bs-target="#xs-injectables-links-module-NotificationModule-7eebe90ca8f6fb4d9c8230f609008bc047495553b8ebd7a85df9ebc5bf01dfed371ba348f6fbfc106252e2db5689c88fd88ff03526636cd0af83caf359aab2d3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotificationModule-7eebe90ca8f6fb4d9c8230f609008bc047495553b8ebd7a85df9ebc5bf01dfed371ba348f6fbfc106252e2db5689c88fd88ff03526636cd0af83caf359aab2d3"' :
                                        'id="xs-injectables-links-module-NotificationModule-7eebe90ca8f6fb4d9c8230f609008bc047495553b8ebd7a85df9ebc5bf01dfed371ba348f6fbfc106252e2db5689c88fd88ff03526636cd0af83caf359aab2d3"' }>
                                        <li class="link">
                                            <a href="injectables/NotificationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotificationsModule.html" data-type="entity-link" >NotificationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-NotificationsModule-9b8492837b9a13d97a7b8b0eb0d395c880a04d29aeef1f4061d1c3903f338730df919ee3365acdc4293f32396e37791f4d45e91a0cab0b64f8f7502d2fea3779"' : 'data-bs-target="#xs-controllers-links-module-NotificationsModule-9b8492837b9a13d97a7b8b0eb0d395c880a04d29aeef1f4061d1c3903f338730df919ee3365acdc4293f32396e37791f4d45e91a0cab0b64f8f7502d2fea3779"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NotificationsModule-9b8492837b9a13d97a7b8b0eb0d395c880a04d29aeef1f4061d1c3903f338730df919ee3365acdc4293f32396e37791f4d45e91a0cab0b64f8f7502d2fea3779"' :
                                            'id="xs-controllers-links-module-NotificationsModule-9b8492837b9a13d97a7b8b0eb0d395c880a04d29aeef1f4061d1c3903f338730df919ee3365acdc4293f32396e37791f4d45e91a0cab0b64f8f7502d2fea3779"' }>
                                            <li class="link">
                                                <a href="controllers/NotificationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-NotificationsModule-9b8492837b9a13d97a7b8b0eb0d395c880a04d29aeef1f4061d1c3903f338730df919ee3365acdc4293f32396e37791f4d45e91a0cab0b64f8f7502d2fea3779"' : 'data-bs-target="#xs-injectables-links-module-NotificationsModule-9b8492837b9a13d97a7b8b0eb0d395c880a04d29aeef1f4061d1c3903f338730df919ee3365acdc4293f32396e37791f4d45e91a0cab0b64f8f7502d2fea3779"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NotificationsModule-9b8492837b9a13d97a7b8b0eb0d395c880a04d29aeef1f4061d1c3903f338730df919ee3365acdc4293f32396e37791f4d45e91a0cab0b64f8f7502d2fea3779"' :
                                        'id="xs-injectables-links-module-NotificationsModule-9b8492837b9a13d97a7b8b0eb0d395c880a04d29aeef1f4061d1c3903f338730df919ee3365acdc4293f32396e37791f4d45e91a0cab0b64f8f7502d2fea3779"' }>
                                        <li class="link">
                                            <a href="injectables/NotificationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotificationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganizersModule.html" data-type="entity-link" >OrganizersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrganizersModule-8eecf205dc6e3f74e04c40767d8eeebe071acb26d698055c5a0a28d25a33c0843b76206a1fc7f6260f22b127a14c500b48cafbfac408c413b43b95283c7df939"' : 'data-bs-target="#xs-controllers-links-module-OrganizersModule-8eecf205dc6e3f74e04c40767d8eeebe071acb26d698055c5a0a28d25a33c0843b76206a1fc7f6260f22b127a14c500b48cafbfac408c413b43b95283c7df939"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrganizersModule-8eecf205dc6e3f74e04c40767d8eeebe071acb26d698055c5a0a28d25a33c0843b76206a1fc7f6260f22b127a14c500b48cafbfac408c413b43b95283c7df939"' :
                                            'id="xs-controllers-links-module-OrganizersModule-8eecf205dc6e3f74e04c40767d8eeebe071acb26d698055c5a0a28d25a33c0843b76206a1fc7f6260f22b127a14c500b48cafbfac408c413b43b95283c7df939"' }>
                                            <li class="link">
                                                <a href="controllers/OrganizersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrganizersModule-8eecf205dc6e3f74e04c40767d8eeebe071acb26d698055c5a0a28d25a33c0843b76206a1fc7f6260f22b127a14c500b48cafbfac408c413b43b95283c7df939"' : 'data-bs-target="#xs-injectables-links-module-OrganizersModule-8eecf205dc6e3f74e04c40767d8eeebe071acb26d698055c5a0a28d25a33c0843b76206a1fc7f6260f22b127a14c500b48cafbfac408c413b43b95283c7df939"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrganizersModule-8eecf205dc6e3f74e04c40767d8eeebe071acb26d698055c5a0a28d25a33c0843b76206a1fc7f6260f22b127a14c500b48cafbfac408c413b43b95283c7df939"' :
                                        'id="xs-injectables-links-module-OrganizersModule-8eecf205dc6e3f74e04c40767d8eeebe071acb26d698055c5a0a28d25a33c0843b76206a1fc7f6260f22b127a14c500b48cafbfac408c413b43b95283c7df939"' }>
                                        <li class="link">
                                            <a href="injectables/OrganizersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganizersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PresenceModule.html" data-type="entity-link" >PresenceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PresenceModule-75e6ffce1561eb2ef306d6032ea295db13182c2a3e1cb3d30ddeff974a21368f501dbb076967249fbced23de48ff18b076d9f457db8791278ae2ccba791457a0"' : 'data-bs-target="#xs-controllers-links-module-PresenceModule-75e6ffce1561eb2ef306d6032ea295db13182c2a3e1cb3d30ddeff974a21368f501dbb076967249fbced23de48ff18b076d9f457db8791278ae2ccba791457a0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PresenceModule-75e6ffce1561eb2ef306d6032ea295db13182c2a3e1cb3d30ddeff974a21368f501dbb076967249fbced23de48ff18b076d9f457db8791278ae2ccba791457a0"' :
                                            'id="xs-controllers-links-module-PresenceModule-75e6ffce1561eb2ef306d6032ea295db13182c2a3e1cb3d30ddeff974a21368f501dbb076967249fbced23de48ff18b076d9f457db8791278ae2ccba791457a0"' }>
                                            <li class="link">
                                                <a href="controllers/PresenceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PresenceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PresenceModule-75e6ffce1561eb2ef306d6032ea295db13182c2a3e1cb3d30ddeff974a21368f501dbb076967249fbced23de48ff18b076d9f457db8791278ae2ccba791457a0"' : 'data-bs-target="#xs-injectables-links-module-PresenceModule-75e6ffce1561eb2ef306d6032ea295db13182c2a3e1cb3d30ddeff974a21368f501dbb076967249fbced23de48ff18b076d9f457db8791278ae2ccba791457a0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PresenceModule-75e6ffce1561eb2ef306d6032ea295db13182c2a3e1cb3d30ddeff974a21368f501dbb076967249fbced23de48ff18b076d9f457db8791278ae2ccba791457a0"' :
                                        'id="xs-injectables-links-module-PresenceModule-75e6ffce1561eb2ef306d6032ea295db13182c2a3e1cb3d30ddeff974a21368f501dbb076967249fbced23de48ff18b076d9f457db8791278ae2ccba791457a0"' }>
                                        <li class="link">
                                            <a href="injectables/PresenceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PresenceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StrategyModule.html" data-type="entity-link" >StrategyModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StrategyModule-a4ea2d840a7340824502c60e498d543786c8e2213e0bbdfb43deebdc3bb5837244f544a066cd05a0969cb195e775349e74f1ac8436bda928cef4d9a2f22db3a9"' : 'data-bs-target="#xs-injectables-links-module-StrategyModule-a4ea2d840a7340824502c60e498d543786c8e2213e0bbdfb43deebdc3bb5837244f544a066cd05a0969cb195e775349e74f1ac8436bda928cef4d9a2f22db3a9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StrategyModule-a4ea2d840a7340824502c60e498d543786c8e2213e0bbdfb43deebdc3bb5837244f544a066cd05a0969cb195e775349e74f1ac8436bda928cef4d9a2f22db3a9"' :
                                        'id="xs-injectables-links-module-StrategyModule-a4ea2d840a7340824502c60e498d543786c8e2213e0bbdfb43deebdc3bb5837244f544a066cd05a0969cb195e775349e74f1ac8436bda928cef4d9a2f22db3a9"' }>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-03191e34fced37452fb1433d25763043d7151f56ad4f2d4101bab317621870f1d2b1c35c67087c02dc0ebd4a8b3d05046c57d2eb44675f6cd90a8f20288f048d"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-03191e34fced37452fb1433d25763043d7151f56ad4f2d4101bab317621870f1d2b1c35c67087c02dc0ebd4a8b3d05046c57d2eb44675f6cd90a8f20288f048d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-03191e34fced37452fb1433d25763043d7151f56ad4f2d4101bab317621870f1d2b1c35c67087c02dc0ebd4a8b3d05046c57d2eb44675f6cd90a8f20288f048d"' :
                                            'id="xs-controllers-links-module-UsersModule-03191e34fced37452fb1433d25763043d7151f56ad4f2d4101bab317621870f1d2b1c35c67087c02dc0ebd4a8b3d05046c57d2eb44675f6cd90a8f20288f048d"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-03191e34fced37452fb1433d25763043d7151f56ad4f2d4101bab317621870f1d2b1c35c67087c02dc0ebd4a8b3d05046c57d2eb44675f6cd90a8f20288f048d"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-03191e34fced37452fb1433d25763043d7151f56ad4f2d4101bab317621870f1d2b1c35c67087c02dc0ebd4a8b3d05046c57d2eb44675f6cd90a8f20288f048d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-03191e34fced37452fb1433d25763043d7151f56ad4f2d4101bab317621870f1d2b1c35c67087c02dc0ebd4a8b3d05046c57d2eb44675f6cd90a8f20288f048d"' :
                                        'id="xs-injectables-links-module-UsersModule-03191e34fced37452fb1433d25763043d7151f56ad4f2d4101bab317621870f1d2b1c35c67087c02dc0ebd4a8b3d05046c57d2eb44675f6cd90a8f20288f048d"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-30f0415f5f6bdfcf559b84b823af632cc606e6941124100fdfb54f32d554845d034b6c11cea71edabac1cde945361682b710fea9d94d45092cbd7f77a78f7d69-1"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-30f0415f5f6bdfcf559b84b823af632cc606e6941124100fdfb54f32d554845d034b6c11cea71edabac1cde945361682b710fea9d94d45092cbd7f77a78f7d69-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-30f0415f5f6bdfcf559b84b823af632cc606e6941124100fdfb54f32d554845d034b6c11cea71edabac1cde945361682b710fea9d94d45092cbd7f77a78f7d69-1"' :
                                            'id="xs-controllers-links-module-UsersModule-30f0415f5f6bdfcf559b84b823af632cc606e6941124100fdfb54f32d554845d034b6c11cea71edabac1cde945361682b710fea9d94d45092cbd7f77a78f7d69-1"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-30f0415f5f6bdfcf559b84b823af632cc606e6941124100fdfb54f32d554845d034b6c11cea71edabac1cde945361682b710fea9d94d45092cbd7f77a78f7d69-1"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-30f0415f5f6bdfcf559b84b823af632cc606e6941124100fdfb54f32d554845d034b6c11cea71edabac1cde945361682b710fea9d94d45092cbd7f77a78f7d69-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-30f0415f5f6bdfcf559b84b823af632cc606e6941124100fdfb54f32d554845d034b6c11cea71edabac1cde945361682b710fea9d94d45092cbd7f77a78f7d69-1"' :
                                        'id="xs-injectables-links-module-UsersModule-30f0415f5f6bdfcf559b84b823af632cc606e6941124100fdfb54f32d554845d034b6c11cea71edabac1cde945361682b710fea9d94d45092cbd7f77a78f7d69-1"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VenuesModule.html" data-type="entity-link" >VenuesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VenuesModule-0945da968a4624b58486f4def53ec0232a7c884213af3a1da32acbeccff69a75a3800e1d9861bc0585c447b87054c87ffb306a54b0ce40f20adef7b8b7e086f5"' : 'data-bs-target="#xs-controllers-links-module-VenuesModule-0945da968a4624b58486f4def53ec0232a7c884213af3a1da32acbeccff69a75a3800e1d9861bc0585c447b87054c87ffb306a54b0ce40f20adef7b8b7e086f5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VenuesModule-0945da968a4624b58486f4def53ec0232a7c884213af3a1da32acbeccff69a75a3800e1d9861bc0585c447b87054c87ffb306a54b0ce40f20adef7b8b7e086f5"' :
                                            'id="xs-controllers-links-module-VenuesModule-0945da968a4624b58486f4def53ec0232a7c884213af3a1da32acbeccff69a75a3800e1d9861bc0585c447b87054c87ffb306a54b0ce40f20adef7b8b7e086f5"' }>
                                            <li class="link">
                                                <a href="controllers/VenuesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VenuesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VenuesModule-0945da968a4624b58486f4def53ec0232a7c884213af3a1da32acbeccff69a75a3800e1d9861bc0585c447b87054c87ffb306a54b0ce40f20adef7b8b7e086f5"' : 'data-bs-target="#xs-injectables-links-module-VenuesModule-0945da968a4624b58486f4def53ec0232a7c884213af3a1da32acbeccff69a75a3800e1d9861bc0585c447b87054c87ffb306a54b0ce40f20adef7b8b7e086f5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VenuesModule-0945da968a4624b58486f4def53ec0232a7c884213af3a1da32acbeccff69a75a3800e1d9861bc0585c447b87054c87ffb306a54b0ce40f20adef7b8b7e086f5"' :
                                        'id="xs-injectables-links-module-VenuesModule-0945da968a4624b58486f4def53ec0232a7c884213af3a1da32acbeccff69a75a3800e1d9861bc0585c447b87054c87ffb306a54b0ce40f20adef7b8b7e086f5"' }>
                                        <li class="link">
                                            <a href="injectables/VenuesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VenuesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WebsocketModule.html" data-type="entity-link" >WebsocketModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Account.html" data-type="entity-link" >Account</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AuthAccount.html" data-type="entity-link" >AuthAccount</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Band.html" data-type="entity-link" >Band</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Contact.html" data-type="entity-link" >Contact</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Credentials.html" data-type="entity-link" >Credentials</a>
                                </li>
                                <li class="link">
                                    <a href="entities/EventKeyword.html" data-type="entity-link" >EventKeyword</a>
                                </li>
                                <li class="link">
                                    <a href="entities/EventTemplate.html" data-type="entity-link" >EventTemplate</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Genre.html" data-type="entity-link" >Genre</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Musician.html" data-type="entity-link" >Musician</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Network.html" data-type="entity-link" >Network</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Organizer.html" data-type="entity-link" >Organizer</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PublishedEvent.html" data-type="entity-link" >PublishedEvent</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Stage.html" data-type="entity-link" >Stage</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User-1.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserSession.html" data-type="entity-link" >UserSession</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Venue.html" data-type="entity-link" >Venue</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/Account-1.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdminGateway.html" data-type="entity-link" >AdminGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/Announcement.html" data-type="entity-link" >Announcement</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssociateUser.html" data-type="entity-link" >AssociateUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/AssociateUser-1.html" data-type="entity-link" >AssociateUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthAccount.html" data-type="entity-link" >AuthAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthController.html" data-type="entity-link" >AuthController</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthMetadata.html" data-type="entity-link" >AuthMetadata</a>
                            </li>
                            <li class="link">
                                <a href="classes/BackLine.html" data-type="entity-link" >BackLine</a>
                            </li>
                            <li class="link">
                                <a href="classes/Band.html" data-type="entity-link" >Band</a>
                            </li>
                            <li class="link">
                                <a href="classes/BandAccount.html" data-type="entity-link" >BandAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/BandsController.html" data-type="entity-link" >BandsController</a>
                            </li>
                            <li class="link">
                                <a href="classes/BannedUser.html" data-type="entity-link" >BannedUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEvent.html" data-type="entity-link" >BaseEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/Broadcast.html" data-type="entity-link" >Broadcast</a>
                            </li>
                            <li class="link">
                                <a href="classes/Bulletin.html" data-type="entity-link" >Bulletin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Business.html" data-type="entity-link" >Business</a>
                            </li>
                            <li class="link">
                                <a href="classes/BusinessAccount.html" data-type="entity-link" >BusinessAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/BusinessContact.html" data-type="entity-link" >BusinessContact</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comment.html" data-type="entity-link" >Comment</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContactDetails.html" data-type="entity-link" >ContactDetails</a>
                            </li>
                            <li class="link">
                                <a href="classes/Content.html" data-type="entity-link" >Content</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBandDto.html" data-type="entity-link" >CreateBandDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEventDto.html" data-type="entity-link" >CreateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLocationDto.html" data-type="entity-link" >CreateLocationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMusicianDto.html" data-type="entity-link" >CreateMusicianDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNetworkDto.html" data-type="entity-link" >CreateNetworkDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOrganizerDto.html" data-type="entity-link" >CreateOrganizerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto-1.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVenueDto.html" data-type="entity-link" >CreateVenueDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Credentials.html" data-type="entity-link" >Credentials</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailLoginDto.html" data-type="entity-link" >EmailLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Event.html" data-type="entity-link" >Event</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventDraft.html" data-type="entity-link" >EventDraft</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventDraft-1.html" data-type="entity-link" >EventDraft</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventKeyword.html" data-type="entity-link" >EventKeyword</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventReview.html" data-type="entity-link" >EventReview</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventsController.html" data-type="entity-link" >EventsController</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventsGateway.html" data-type="entity-link" >EventsGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventTemplate.html" data-type="entity-link" >EventTemplate</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlaggedComment.html" data-type="entity-link" >FlaggedComment</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlaggedEvent.html" data-type="entity-link" >FlaggedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlaggedItem.html" data-type="entity-link" >FlaggedItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/FlaggedPost.html" data-type="entity-link" >FlaggedPost</a>
                            </li>
                            <li class="link">
                                <a href="classes/Genre.html" data-type="entity-link" >Genre</a>
                            </li>
                            <li class="link">
                                <a href="classes/GoogleLoginDto.html" data-type="entity-link" >GoogleLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Group.html" data-type="entity-link" >Group</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupBroadcast.html" data-type="entity-link" >GroupBroadcast</a>
                            </li>
                            <li class="link">
                                <a href="classes/Instrument.html" data-type="entity-link" >Instrument</a>
                            </li>
                            <li class="link">
                                <a href="classes/IssuedWarning.html" data-type="entity-link" >IssuedWarning</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocationsController.html" data-type="entity-link" >LocationsController</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessagingGateway.html" data-type="entity-link" >MessagingGateway</a>
                            </li>
                            <li class="link">
                                <a href="classes/ModerationAction.html" data-type="entity-link" >ModerationAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/Musician.html" data-type="entity-link" >Musician</a>
                            </li>
                            <li class="link">
                                <a href="classes/MusicianAccount.html" data-type="entity-link" >MusicianAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/MusiciansController.html" data-type="entity-link" >MusiciansController</a>
                            </li>
                            <li class="link">
                                <a href="classes/Network.html" data-type="entity-link" >Network</a>
                            </li>
                            <li class="link">
                                <a href="classes/Network-1.html" data-type="entity-link" >Network</a>
                            </li>
                            <li class="link">
                                <a href="classes/NetworkBroadcast.html" data-type="entity-link" >NetworkBroadcast</a>
                            </li>
                            <li class="link">
                                <a href="classes/NetworksController.html" data-type="entity-link" >NetworksController</a>
                            </li>
                            <li class="link">
                                <a href="classes/Newsletter.html" data-type="entity-link" >Newsletter</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationChannel.html" data-type="entity-link" >NotificationChannel</a>
                            </li>
                            <li class="link">
                                <a href="classes/OAuthCredentials.html" data-type="entity-link" >OAuthCredentials</a>
                            </li>
                            <li class="link">
                                <a href="classes/Opinion.html" data-type="entity-link" >Opinion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Organizer.html" data-type="entity-link" >Organizer</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizerAccount.html" data-type="entity-link" >OrganizerAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizerReview.html" data-type="entity-link" >OrganizerReview</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizersController.html" data-type="entity-link" >OrganizersController</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizerUser.html" data-type="entity-link" >OrganizerUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrganizerUser-1.html" data-type="entity-link" >OrganizerUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordCredentials.html" data-type="entity-link" >PasswordCredentials</a>
                            </li>
                            <li class="link">
                                <a href="classes/PasswordLogin.html" data-type="entity-link" >PasswordLogin</a>
                            </li>
                            <li class="link">
                                <a href="classes/PastEvent.html" data-type="entity-link" >PastEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/PASystem.html" data-type="entity-link" >PASystem</a>
                            </li>
                            <li class="link">
                                <a href="classes/Performer.html" data-type="entity-link" >Performer</a>
                            </li>
                            <li class="link">
                                <a href="classes/PerformerAccount.html" data-type="entity-link" >PerformerAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/PerformerReview.html" data-type="entity-link" >PerformerReview</a>
                            </li>
                            <li class="link">
                                <a href="classes/PerformerUser.html" data-type="entity-link" >PerformerUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/PerformerUser-1.html" data-type="entity-link" >PerformerUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrivateGroup.html" data-type="entity-link" >PrivateGroup</a>
                            </li>
                            <li class="link">
                                <a href="classes/PublicUser.html" data-type="entity-link" >PublicUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/PublicUser-1.html" data-type="entity-link" >PublicUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/PublishedEvent.html" data-type="entity-link" >PublishedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemovedComment.html" data-type="entity-link" >RemovedComment</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResolvedCases.html" data-type="entity-link" >ResolvedCases</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resource.html" data-type="entity-link" >Resource</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resource-1.html" data-type="entity-link" >Resource</a>
                            </li>
                            <li class="link">
                                <a href="classes/Review.html" data-type="entity-link" >Review</a>
                            </li>
                            <li class="link">
                                <a href="classes/Session.html" data-type="entity-link" >Session</a>
                            </li>
                            <li class="link">
                                <a href="classes/SocialPost.html" data-type="entity-link" >SocialPost</a>
                            </li>
                            <li class="link">
                                <a href="classes/SocialPostDraft.html" data-type="entity-link" >SocialPostDraft</a>
                            </li>
                            <li class="link">
                                <a href="classes/Stage.html" data-type="entity-link" >Stage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Stage-1.html" data-type="entity-link" >Stage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Statement.html" data-type="entity-link" >Statement</a>
                            </li>
                            <li class="link">
                                <a href="classes/SwaggerDocBuilder.html" data-type="entity-link" >SwaggerDocBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tag.html" data-type="entity-link" >Tag</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tag-1.html" data-type="entity-link" >Tag</a>
                            </li>
                            <li class="link">
                                <a href="classes/Thread.html" data-type="entity-link" >Thread</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBandDto.html" data-type="entity-link" >UpdateBandDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEventDto.html" data-type="entity-link" >UpdateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateLocationDto.html" data-type="entity-link" >UpdateLocationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMusicianDto.html" data-type="entity-link" >UpdateMusicianDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateNetworkDto.html" data-type="entity-link" >UpdateNetworkDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrganizerDto.html" data-type="entity-link" >UpdateOrganizerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto-1.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVenueDto.html" data-type="entity-link" >UpdateVenueDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/User-1.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsernameLoginDto.html" data-type="entity-link" >UsernameLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPreferences.html" data-type="entity-link" >UserPreferences</a>
                            </li>
                            <li class="link">
                                <a href="classes/UsersController.html" data-type="entity-link" >UsersController</a>
                            </li>
                            <li class="link">
                                <a href="classes/Venue.html" data-type="entity-link" >Venue</a>
                            </li>
                            <li class="link">
                                <a href="classes/VenueAccount.html" data-type="entity-link" >VenueAccount</a>
                            </li>
                            <li class="link">
                                <a href="classes/VenueKeyword.html" data-type="entity-link" >VenueKeyword</a>
                            </li>
                            <li class="link">
                                <a href="classes/VenueReview.html" data-type="entity-link" >VenueReview</a>
                            </li>
                            <li class="link">
                                <a href="classes/VenuesController.html" data-type="entity-link" >VenuesController</a>
                            </li>
                            <li class="link">
                                <a href="classes/VenueUser.html" data-type="entity-link" >VenueUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/VenueUser-1.html" data-type="entity-link" >VenueUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/VersionedResource.html" data-type="entity-link" >VersionedResource</a>
                            </li>
                            <li class="link">
                                <a href="classes/VersionedResource-1.html" data-type="entity-link" >VersionedResource</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ConnectionService-1.html" data-type="entity-link" >ConnectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExternalAuthService.html" data-type="entity-link" >ExternalAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JWTAuthGuard.html" data-type="entity-link" >JWTAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy-1.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy-2.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy-3.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy-4.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocialAuthService.html" data-type="entity-link" >SocialAuthService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard-1.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard-1.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/WebsocketGuard.html" data-type="entity-link" >WebsocketGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AuthOptions.html" data-type="entity-link" >AuthOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindAllOptions.html" data-type="entity-link" >FindAllOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FindOneOptions.html" data-type="entity-link" >FindOneOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginBase.html" data-type="entity-link" >LoginBase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationFilter.html" data-type="entity-link" >NotificationFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationMetadata.html" data-type="entity-link" >NotificationMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NotificationServiceOptions.html" data-type="entity-link" >NotificationServiceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PatchOptions.html" data-type="entity-link" >PatchOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PhysicalSpace.html" data-type="entity-link" >PhysicalSpace</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PhysicalSpace-1.html" data-type="entity-link" >PhysicalSpace</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});