
<header class="header" id="site-header">
	<div class="container">
		<div class="header-content-wrapper">
			<a href="{{ route('home') }}" class="site-logo">
				<img src="{{ asset('assets/logo-icon.png') }}" alt="digital_rupaiya" style="width: 100px">
			</a>

			<nav id="primary-menu" class="primary-menu">

				<!-- menu-icon-wrapper -->

				<a href='javascript:void(0)' id="menu-icon-trigger" class="menu-icon-trigger showhide">
					<span class="mob-menu--title">Menu</span>
					<span id="menu-icon-wrapper" class="menu-icon-wrapper">
						<svg width="1000px" height="1000px">
							<path id="pathD" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
							<path id="pathE" d="M 300 500 L 700 500"></path>
							<path id="pathF" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
						</svg>
					</span>
				</a>

				<ul class="primary-menu-menu">
					<li>
						<a href="{{ url("./") }}">Home</a>
					</li>

					<li class="menu-item-has-children">
						<a href="#">Cryptocurrencies</a>
						<ul class="sub-menu">
							<li class="menu-item-has-children">
								<a href="{{ url('crypto-currencies') }}">
									Digital <span>Rupaiya</span>
								</a>
								<ul class="sub-menu">
									<li>
										<a href="{{ url('crypto-currencies') }}">Support Digital Rupaiya</a>
									</li>
									<li>
										<a href="{{ url('crypto-currencies') }}">How to buy Digital Rupaiya</a>
									</li>

									<li>
										<a href="{{ url('crypto-currencies') }}">Development</a>
									</li>

									<li>
										<a href="{{ url('crypto-currencies') }}">Exchange</a>
									</li>
								</ul>
							</li>
							<li class="menu-item-has-children">
								<a href="{{ url('crypto-currencies') }}">
									Ethereum <span>ETH</span>
								</a>
								<ul class="sub-menu">
									<li>
										<a href="{{ url('crypto-currencies') }}">Support Ethereum</a>
									</li>
									<li>
										<a href="{{ url('crypto-currencies') }}">How to buy Ethereum</a>
									</li>

									<li>
										<a href="{{ url('crypto-currencies') }}">Development</a>
									</li>

									<li>
										<a href="{{ url('crypto-currencies') }}">Exchange</a>
									</li>
								</ul>
							</li>
							<li class="menu-item-has-children">
								<a href="{{ url('crypto-currencies') }}">
									Dash <span>DASH</span>
								</a>
								<ul class="sub-menu">
									<li>
										<a href="{{ url('crypto-currencies') }}">Support Dash</a>
									</li>
									<li>
										<a href="{{ url('crypto-currencies') }}">How to buy Dash</a>
									</li>

									<li>
										<a href="{{ url('crypto-currencies') }}">Development</a>
									</li>

									<li>
										<a href="{{ url('crypto-currencies') }}">Exchange</a>
									</li>
								</ul>
							</li>
							<li class="menu-item-has-children">
								<a href="{{ url('crypto-currencies') }}">
									Litecoin <span>LTC</span>
								</a>
								<ul class="sub-menu">
									<li>
										<a href="{{ url('crypto-currencies') }}">Support Litecoin</a>
									</li>
									<li>
										<a href="{{ url('crypto-currencies') }}">How to buy Litecoin</a>
									</li>

									<li>
										<a href="{{ url('crypto-currencies') }}">Development</a>
									</li>

									<li>
										<a href="{{ url('crypto-currencies') }}">Exchange</a>
									</li>
								</ul>
							</li>
							<li class="menu-item-has-children">
								<a href="{{ url('crypto-currencies') }}">
									Ripple <span>XRP</span>
								</a>
								<ul class="sub-menu">
									<li>
										<a href="{{ url('crypto-currencies') }}">Support XRP</a>
									</li>
									<li>
										<a href="{{ url('crypto-currencies') }}">How to buy XRP</a>
									</li>

									<li>
										<a href="{{ url('crypto-currencies') }}">Development</a>
									</li>

									<li>
										<a href="{{ url('crypto-currencies') }}">Exchange</a>
									</li>
								</ul>
							</li>
						</ul>
					</li>

					<li class="menu-item-has-children">
						<a href="#">Experts</a>
						<ul class="sub-menu sub-menu--with-icons">
							<li class="menu-item-has-children">
								<a href="{{ url('experts') }}">
									<img src="assets/if_Bitcoin_2745023.png" class="woox-icon" alt="bitcoin">
									Bitcoin <span>BTC</span>
									
								</a>
								<ul class="sub-menu">
									<li>
										<a href="{{ url('experts') }}">Support Digital Rupaiya</a>
									</li>
									<li>
										<a href="{{ url('experts') }}">How to buy Digital Rupaiya</a>
									</li>

									<li>
										<a href="{{ url('experts') }}">Development</a>
									</li>

									<li>
										<a href="{{ url('experts') }}">Exchange</a>
									</li>
								</ul>
							</li>
							<li class="menu-item-has-children">
								<a href="{{ url('experts') }}">
									<img src="{{  asset('assets/if_etherium_eth_ethcoin_crypto_2844386.png') }}" class="woox-icon" alt="bitcoin">
									Ethereum <span>ETH</span>
									<svg class="woox-icon icon-arrow-right-line">
										<use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-right-line"></use>
									</svg>
								</a>
								<ul class="sub-menu">
									<li>
										<a href="{{ url('experts') }}">Support Ethereum</a>
									</li>
									<li>
										<a href="{{ url('experts') }}">How to buy Ethereum</a>
									</li>

									<li>
										<a href="{{ url('experts') }}">Development</a>
									</li>

									<li>
										<a href="{{ url('experts') }}">Exchange</a>
									</li>
								</ul>
							</li>
							<li class="menu-item-has-children">
								<a href="{{ url('experts') }}">
									<img src="{{  asset('assets/if_dash_dashcoin_2844383.png') }}" class="woox-icon" alt="bitcoin">
									Dash <span>DASH</span>
									<svg class="woox-icon icon-arrow-right-line">
										<use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-right-line"></use>
									</svg>
								</a>
								<ul class="sub-menu">
									<li>
										<a href="{{ url('experts') }}">Support Dash</a>
									</li>
									<li>
										<a href="{{ url('experts') }}">How to buy Dash</a>
									</li>

									<li>
										<a href="{{ url('experts') }}">Development</a>
									</li>

									<li>
										<a href="{{ url('experts') }}">Exchange</a>
									</li>
								</ul>
							</li>
							<li class="menu-item-has-children">
								<a href="{{ url('experts') }}">
									<img src="{{ asset('assets/if_litecion_ltc_lite_coin_crypto_2844390.png') }}" class="woox-icon" alt="litecoin">
									Litecoin <span>LTC</span>
									<svg class="woox-icon icon-arrow-right-line">
										<use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-right-line"></use>
									</svg>
								</a>
								<ul class="sub-menu">
									<li>
										<a href="{{ url('experts') }}">Support Litecoin</a>
									</li>
									<li>
										<a href="{{ url('experts') }}">How to buy Litecoin</a>
									</li>

									<li>
										<a href="{{ url('experts') }}">Development</a>
									</li>

									<li>
										<a href="{{ url('experts') }}">Exchange</a>
									</li>
								</ul>
							</li>
							<li class="menu-item-has-children">
								<a href="{{ url('experts') }}">
									<img src="{{ asset('assets/if_ripple_xrp_coin_2844396.png') }} " class="woox-icon" alt="bitcoin">
									Ripple <span>XRP</span>
									<svg class="woox-icon icon-arrow-right-line">
										<use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-right-line"></use>
									</svg>
								</a>
								<ul class="sub-menu">
									<li>
										<a href="{{ url('experts') }}">Support XRP</a>
									</li>
									<li>
										<a href="{{ url('experts') }}">How to buy XRP</a>
									</li>

									<li>
										<a href="{{ url('experts') }}">Development</a>
									</li>

									<li>
										<a href="{{ url('experts') }}">Exchange</a>
									</li>
								</ul>
							</li>
						</ul>
					</li>

					<li class="menu-item-has-mega-menu menu-item-has-children">
						<a href="#">Coin Market</a>
						<div class="megamenu megamenu-bg">
							<div class="megamenu-row">

								<div class="col4">
									<ul>
										<li class="megamenu-item-info">
											<h5 class="megamenu-item-info-title">Tools</h5>
										</li>
										<li>
											<a href="{{ url('coin-market') }}">Global Charts</a>
										</li>
										<li>
											<a href="{{ url('coin-market') }}">Currency Converter</a>
										</li>
										<li>
											<a href="{{ url('coin-market') }}">Website Widgets</a>
										</li>
									</ul>
								</div>
								<div class="col4">
									<ul>
										<li class="megamenu-item-info">
											<h5 class="megamenu-item-info-title">Market Cap</h5>
										</li>
										<li>
											<a href="{{ url('coin-market') }}">Top 5 Coins</a>
										</li>

										<li>
											<a href="{{ url('coin-market') }}">Tokens</a>
										</li>
									</ul>
								</div>
								<div class="col4">
									<ul>
										<li class="megamenu-item-info">
											<h5 class="megamenu-item-info-title">Trending</h5>
										</li>
										<li>
											<a href="{{ url('coin-market') }}">Gainers and Losers</a>
										</li>
										<li>
											<a href="{{ url('coin-market') }}">Recently Added</a>
										</li>
									</ul>
								</div>

								<div class="col4">

								</div>

							</div>
						</div>
					</li>

					<li class="menu-item-has-mega-menu menu-item-has-children">
						<a href="#">Events</a>

						<div class="megamenu megamenu-with-slider">

							<div class="crumina-module crumina-module-slider slider-item--equal-height">
								<div class="row">
									<div class="col-lg-3">
										<div class="crumina-module crumina-heading heading--with-decoration heading--h5">   <h5 class="heading-title">Upcoming Events</h5>   <div class="heading-text">Investigationes demonstraverunt lectores legere me lius      quod ii legunt faucibus ac feugiat sed lectus.   </div></div>
										<div class="swiper-btn-wrap">
											<div class="swiper-btn-prev">
												<svg class="woox-icon icon-line-arrow-left">
													<use xlink:href="svg-icons/sprites/icons.svg#icon-line-arrow-left"></use>
												</svg>
											</div>

											<div class="swiper-btn-next">
												<svg class="woox-icon icon-line-arrow-right">
													<use xlink:href="svg-icons/sprites/icons.svg#icon-line-arrow-right"></use>
												</svg>
											</div>
										</div>
									</div>
									<div class="col-lg-9">
										<div class="swiper-container" data-show-items="3" data-prev-next="1">
											<div class="swiper-wrapper">
												<div class="swiper-slide">
													<a href="{{ url('events') }}" class="crumina-module crumina-event-item">
														<div class="event-thumb bg-event1">
															<div class="overlay"></div>
														</div>
														<div class="event-content">
															<div class="event-date">
																<svg class="woox-icon icon-school-calendar">
																	<use xlink:href="svg-icons/sprites/icons.svg#icon-school-calendar"></use>
																</svg>
																March 16, 2018
															</div>
															<h6 class="event-title">What is Digital Rupaiya? A Step-By-Step Guide For Beginners</h6>
														</div>
													</a>
												</div>
												<div class="swiper-slide">
													<a href="{{ url('event-detail') }}" class="crumina-module crumina-event-item">
														<div class="event-thumb bg-event2">
															<div class="overlay"></div>
														</div>
														<div class="event-content">
															<div class="event-date">
																<svg class="woox-icon icon-school-calendar">
																	<use xlink:href="svg-icons/sprites/icons.svg#icon-school-calendar"></use>
																</svg>
																March 16, 2018
															</div>
															<h6 class="event-title">Apply them in Your Own Routines</h6>
														</div>
													</a>
												</div>
												<div class="swiper-slide">
													<a href="{{ url('event-detail') }}" class="crumina-module crumina-event-item">
														<div class="event-thumb bg-event3">
															<div class="overlay"></div>
														</div>
														<div class="event-content">
															<div class="event-date">
																<svg class="woox-icon icon-school-calendar">
																	<use xlink:href="svg-icons/sprites/icons.svg#icon-school-calendar"></use>
																</svg>
																March 16, 2018
															</div>
															<h6 class="event-title">Is your business ready for a production blockchain rollout?</h6>
														</div>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>
					</li>

					

					<li class="">
						<a href="{{ url('contact') }}">Contacts</a>
					</li>
				</ul>

			</nav>

			<select class="woox--select language-switcher" data-minimum-results-for-search="Infinity" data-dropdown-css-class="language-switcher-dropdown">
				<option value="French">French</option>
				<option value="German">German</option>
				<option value="Ukrainian">Ukrainian</option>
				<option value="English">English</option>
			</select>

		</div>
	</div>
</header>