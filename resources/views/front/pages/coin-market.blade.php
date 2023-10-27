@extends('layouts.front')

@section("body")
<div class="main-content-wrapper">
	<section data-settings="particles-1" class="main-section crumina-flying-balls particles-js bg-1">
		<div class="container">
			<div class="row medium-padding120 align-center">
				<div class="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
					<header class="crumina-module crumina-heading heading--h2 heading--with-decoration">
						<div class="heading-sup-title">Coin Market</div>
						<h2 class="heading-title heading--half-colored">Buy Cryptocurrency</h2>
						<div class="heading-text">Investigationes demonstraverunt lectores legere elementum pulvinar etiam non quam lacus suspendisse risus nec feugiat in laoreet sit amet cursus.</div>
					</header>
					<a data-scroll href="#started" class="btn btn--large btn--primary btn--transparent">Get Started Now!</a>
				</div>
			</div>
		</div>
	</section>

	<section class="medium-padding100">
		<div class="container">
			<div id="started" class="row align-center">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="crumina-module crumina-module-slider pagination-bottom-center">
						<div class="swiper-container" data-show-items="3" data-prev-next="1">
							<div class="swiper-wrapper">
								<div class="swiper-slide">
									<div class="crumina-module crumina-pricing-table pricing-table--small">
										<div class="pricing-thumb">
											<img src="assets/if_Bitcoin_2745023.png" class="woox-icon" alt="bitcoin">
											<h5 class="pricing-title">Bitcoin <span>BTC</span></h5>
											<div class="gain-drop-arrow">
												<svg class="woox-icon icon-arrow-up arrow-up active">
													<use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-up"></use>
												</svg>
												<svg class="woox-icon icon-arrow-down arrow-down">
													<use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-down"></use>
												</svg>
											</div>
										</div>
										<div class="price">
											<div class="price-sup-title">1 Bitcoin equals:</div>
											<div class="price-value">$9.635.34
												<div class="growth">+ 1.25%</div>
											</div>
										</div>
										<a href="#" class="btn btn--large btn--dark-lighter btn--transparent full-width">Buy Bitcoin Now!</a>
									</div>
								</div>
								<div class="swiper-slide">
									<div class="crumina-module crumina-pricing-table pricing-table--small">
										<div class="pricing-thumb">
											<img src="assets/if_etherium_eth_ethcoin_crypto_2844386.png" class="woox-icon" alt="ethereum">
											<h5 class="pricing-title">Ethereum <span>ETH</span></h5>
											<div class="gain-drop-arrow">
												<svg class="woox-icon icon-arrow-up arrow-up">
													<use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-up"></use>
												</svg>
												<svg class="woox-icon icon-arrow-down arrow-down active">
													<use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-down"></use>
												</svg>
											</div>
										</div>
										<div class="price">
											<div class="price-sup-title">1 Ethereum equals:</div>
											<div class="price-value">$820.93
												<div class="drop">- 4.22%</div>
											</div>
										</div>
										<a href="#" class="btn btn--large btn--dark-lighter btn--transparent full-width">Buy Ethereum Now!</a>
									</div>
								</div>
								<div class="swiper-slide">
									<div class="crumina-module crumina-pricing-table pricing-table--small">
										<div class="pricing-thumb">
											<img src="assets/if_dash_dashcoin_2844383.png" class="woox-icon" alt="dash">
											<h5 class="pricing-title">Dash <span>Dash</span></h5>
											<div class="gain-drop-arrow">
												<svg class="woox-icon icon-arrow-up arrow-up active">
													<use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-up"></use>
												</svg>
												<svg class="woox-icon icon-arrow-down arrow-down">
													<use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-down"></use>
												</svg>
											</div>
										</div>
										<div class="price">
											<div class="price-sup-title">1 Dash equals:</div>
											<div class="price-value">$611.24
												<div class="growth">+ 1.25%</div>
											</div>
										</div>
										<a href="#" class="btn btn--large btn--dark-lighter btn--transparent full-width">Buy Dash Now!</a>
									</div>
								</div>
							</div>
						</div>
						<!-- If we need pagination -->
						<div class="swiper-pagination"></div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div class="container">
			<div class="row medium-padding120">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="mCustomScrollbar scrollable-responsive-table" data-mcs-theme="dark">
						<table class="pricing-tables-wrap-table-blurring">
							<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Market Cap</th>
								<th>Price</th>
								<th>Change</th>
								<th>Circulating Supply</th>
								<th>Payment Method</th>
								<th></th>
							</tr>
							</thead>

							<tbody>
							<tr class="crumina-module crumina-pricing-table pricing-table--style-table-blurring c-brown">
								<td>
									1
								</td>
								<td>
									<div class="pricing-thumb">
										<img src="assets/if_Bitcoin_2745023.png" class="woox-icon" alt="bitcoin">
										<h6 class="pricing-title">Bitcoin <span>BTC</span></h6>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">$171.559.166.785</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-primary">$10.163.30</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-green-succes">+ 25.94%</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">16.880.262 BTC</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="payment-method">
											<img src="assets/paypal.png" class="woox-icon" alt="paypal">
											<img src="assets/mastercard.png" class="woox-icon" alt="mastercard">
											<img src="assets/visa.png" class="woox-icon" alt="visa">
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="btn btn--small btn--green-light">Buy Now</a>
								</td>
							</tr>
							<tr class="crumina-module crumina-pricing-table pricing-table--style-table-blurring c-blue">
								<td>
									2
								</td>
								<td>
									<div class="pricing-thumb">
										<img src="assets/if_etherium_eth_ethcoin_crypto_2844386.png" class="woox-icon" alt="bitcoin">
										<h6 class="pricing-title">Ethereum <span>ETH</span></h6>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">$80.266.577.723</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-primary">$857.17</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-red-light">- 4.22%</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">97.790.573 ETH</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="payment-method">
											<img src="assets/paypal.png" class="woox-icon" alt="paypal">
											<img src="assets/mastercard.png" class="woox-icon" alt="mastercard">
											<img src="assets/visa.png" class="woox-icon" alt="visa">
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="btn btn--small btn--green-light">Buy Now</a>
								</td>
							</tr>
							<tr class="crumina-module crumina-pricing-table pricing-table--style-table-blurring c-blue-light">
								<td>
									3
								</td>
								<td>
									<div class="pricing-thumb">
										<img src="assets/if_dash_dashcoin_2844383.png" class="woox-icon" alt="bitcoin">
										<h6 class="pricing-title">Dash <span>DASH</span></h6>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">$4.964.598.370</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-primary">$641.33</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-green-succes">+ 3.86%</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">7.901.482 DASH</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="payment-method">
											<img src="assets/paypal.png" class="woox-icon" alt="paypal">
											<img src="assets/mastercard.png" class="woox-icon" alt="mastercard">
											<img src="assets/visa.png" class="woox-icon" alt="visa">
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="btn btn--small btn--green-light">Buy Now</a>
								</td>
							</tr>
							<tr class="crumina-module crumina-pricing-table pricing-table--style-table-blurring c-border-color">
								<td>
									4
								</td>
								<td>
									<div class="pricing-thumb">
										<img src="assets/if_litecion_ltc_lite_coin_crypto_2844390.png" class="woox-icon" alt="bitcoin">
										<h6 class="pricing-title">Litecoin <span>LTC</span></h6>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">$11.868.672.826</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-primary">$214.45</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-red-light">- 0.58%</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">55.345.483 LTC</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="payment-method">
											<img src="assets/paypal.png" class="woox-icon" alt="paypal">
											<img src="assets/mastercard.png" class="woox-icon" alt="mastercard">
											<img src="assets/visa.png" class="woox-icon" alt="visa">
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="btn btn--small btn--green-light">Buy Now</a>
								</td>
							</tr>
							<tr class="crumina-module crumina-pricing-table pricing-table--style-table-blurring c-blue-lighter">
								<td>
									5
								</td>
								<td>
									<div class="pricing-thumb">
										<img src="assets/if_ripple_xrp_coin_2844396.png" class="woox-icon" alt="bitcoin">
										<h6 class="pricing-title">Ripple <span>XRP</span></h6>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">$40.076.472.675</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-primary">$1.03</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-green-succes">+ 22.04%</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">39.094.802.192 XRP</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="payment-method">
											<img src="assets/paypal.png" class="woox-icon" alt="paypal">
											<img src="assets/mastercard.png" class="woox-icon" alt="mastercard">
											<img src="assets/visa.png" class="woox-icon" alt="visa">
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="btn btn--small btn--green-light">Buy Now</a>
								</td>
							</tr>
							<tr class="crumina-module crumina-pricing-table pricing-table--style-table-blurring c-blue-lighter">
								<td>
									6
								</td>
								<td>
									<div class="pricing-thumb">
										<img src="assets/logo-primary.png" class="woox-icon" alt="woox">
										<h6 class="pricing-title">Woox <span>WOOX</span></h6>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">$672.826</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-primary">$0.09</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value c-red-light">- 1.3%</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="value">485.678 WOOX</div>
									</div>
								</td>
								<td>
									<div class="currency-details-item">
										<div class="payment-method">
											<img src="assets/paypal.png" class="woox-icon" alt="paypal">
											<img src="assets/mastercard.png" class="woox-icon" alt="mastercard">
											<img src="assets/visa.png" class="woox-icon" alt="visa">
										</div>
									</div>
								</td>
								<td>
									<a href="#" class="btn btn--small btn--green-light">Buy Now</a>
								</td>
							</tr>

							</tbody>
							<tfoot>
							<tr>
								<td colspan="8">NOTE! Ullamcorper sit amet risus nullam. Ac ut consequat semper viverra. Tristique senectus et netus et malesuada fames ac turpis.</td>
							</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>

</div>
@endsection