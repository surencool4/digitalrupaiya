@extends('layouts.front')

@section("body")
<div class="main-content-wrapper">
	<section data-settings="particles-1" class="main-section crumina-flying-balls particles-js bg-1 medium-padding120">
		<div class="container">
			<div class="row align-center mb60">
				<div class="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
					<header class="crumina-module crumina-heading heading--h2 heading--with-decoration">
						<div class="heading-sup-title">EVENTS</div>
						<h2 class="heading-title heading--half-colored">Upcoming <span class="weight-bold">events</span>
						</h2>
						<div class="heading-text">Investigationes demonstraverunt lectores legere elementum pulvinar etiam non quam lacus suspendisse risus nec feugiat in laoreet sit amet cursus.</div>
					</header>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-4 col-lg-offset-4 col-md-12 col-sm-12 col-xs-12">
					<div class="input-with-btn-inline">
						<input id='name' name="name" placeholder="Your Email Address" type="text" value="">
						<button class="btn btn--large btn--green-light">Subscribe</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="crumina-module crumina-module-slider navigation-center-both-sides pagination-bottom-center slider-events pt80">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

					<div class="swiper-container" data-show-items="1" data-prev-next="1">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<div class="crumina-module crumina-event-item">
									<div class="event-thumb bg-event4" data-swiper-parallax="100">
										<div class="overlay"></div>
									</div>
									<div class="event-content" data-swiper-parallax="-300">
										<h3 class="event-title">Is your business ready for a production blockchain rollout?</h3>
										<div class="countdown-btn-wrap">
											<div class="crumina-countdown-item">
												<div class="crumina-countdown-number" data-date="2019-01-01 00:00:00"></div>
											</div>
											<a href="007_event_details.html" class="btn btn--medium btn--transparent btn--secondary">Details</a>
										</div>
									</div>

									<div class="event-venue" data-swiper-parallax="-300">
										<div class="event-date">
											<svg class="woox-icon icon-school-calendar">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-school-calendar"></use>
											</svg>
											March 16, 2018
										</div>
										<div class="event-date">
											<svg class="woox-icon icon-placeholder">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-placeholder"></use>
											</svg>
											Juarez & Associates, 12139 National Boulevard, Los Angeles, CA, U.S.
										</div>
										<div class="author-block">
											<div class="avatar avatar60">
												<img src="assets/author2.jpg" alt="avatar">
											</div>
											<div class="author-content">
												<a href="#" class="author-name">Philip Demarco</a>
												<div class="author-prof">speaker</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="crumina-module crumina-event-item">
									<div class="event-thumb bg-event5" data-swiper-parallax="100">
										<div class="overlay"></div>
									</div>
									<div class="event-content" data-swiper-parallax="-300">
										<h3 class="event-title">Is your business ready for a production blockchain rollout?</h3>
										<div class="countdown-btn-wrap">
											<div class="crumina-countdown-item">
												<div class="crumina-countdown-number" data-date="2019-01-01 00:00:00"></div>
											</div>
											<a href="007_event_details.html" class="btn btn--medium btn--transparent btn--secondary">Details</a>
										</div>
									</div>

									<div class="event-venue" data-swiper-parallax="-300">
										<div class="event-date">
											<svg class="woox-icon icon-school-calendar">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-school-calendar"></use>
											</svg>
											March 16, 2018
										</div>
										<div class="event-date">
											<svg class="woox-icon icon-placeholder">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-placeholder"></use>
											</svg>
											Juarez & Associates, 12139 National Boulevard, Los Angeles, CA, U.S.
										</div>
										<div class="author-block">
											<div class="avatar avatar60">
												<img src="assets/author2.jpg" alt="avatar">
											</div>
											<div class="author-content">
												<a href="#" class="author-name">Philip Demarco</a>
												<div class="author-prof">speaker</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="crumina-module crumina-event-item">
									<div class="event-thumb bg-event4" data-swiper-parallax="100">
										<div class="overlay"></div>
									</div>
									<div class="event-content" data-swiper-parallax="-300">
										<h3 class="event-title">Is your business ready for a production blockchain rollout?</h3>
										<div class="countdown-btn-wrap">
											<div class="crumina-countdown-item">
												<div class="crumina-countdown-number" data-date="2019-01-01 00:00:00"></div>
											</div>
											<a href="{{ url('event-detail') }}" class="btn btn--medium btn--transparent btn--secondary">Details</a>
										</div>
									</div>

									<div class="event-venue" data-swiper-parallax="-300">
										<div class="event-date">
											<svg class="woox-icon icon-school-calendar">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-school-calendar"></use>
											</svg>
											March 16, 2018
										</div>
										<div class="event-date">
											<svg class="woox-icon icon-placeholder">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-placeholder"></use>
											</svg>
											Juarez & Associates, 12139 National Boulevard, Los Angeles, CA, U.S.
										</div>
										<div class="author-block">
											<div class="avatar avatar60">
												<img src="assets/author2.jpg" alt="avatar">
											</div>
											<div class="author-content">
												<a href="#" class="author-name">Philip Demarco</a>
												<div class="author-prof">speaker</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- If we need pagination -->
		<div class="swiper-pagination"></div>
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
	</section>

	<section class="medium-padding120">
		<div class="container">
			<div class="row sorting-container" id="portfolio-grid" data-layout="masonry" data-isotope='{"masonry": { "columnWidth": ".grid-sizer" }}'>
				<div class="grid-sizer"></div>
				<div class="col-lg-8 col-md-6 col-sm-6 col-xs-12 sorting-item">
					<div class="crumina-module crumina-event-item">
						<div class="event-thumb bg-event5">
							<div class="overlay"></div>
						</div>
						<div class="event-content">
							<h4 class="event-title mb30">What is Bitcoin? A Step-By-Step Guide For Beginners</h4>
							<a href="{{ url('event-detail') }}" class="btn btn--medium btn--transparent btn--secondary">Details</a>
						</div>

						<div class="event-venue">
							<div class="event-date">
								<svg class="woox-icon icon-school-calendar">
									<use xlink:href="svg-icons/sprites/icons.svg#icon-school-calendar"></use>
								</svg>
								March 16, 2018
							</div>
							<div class="event-date">
								<svg class="woox-icon icon-placeholder">
									<use xlink:href="svg-icons/sprites/icons.svg#icon-placeholder"></use>
								</svg>
								The Lakes Golf Course 400 S. Sepulveda Boulevard, El Segundo,
							</div>
							<div class="author-block">
								<div class="avatar avatar60">
									<img src="assets/author1-60.jpg" alt="avatar">
								</div>
								<div class="author-content">
									<a href="#" class="author-name">Angelina Johnson</a>
									<div class="author-prof">speaker</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 sorting-item">
					<div class="crumina-module crumina-event-item event-item--content-column">
						<div class="event-thumb bg-event6">
							<div class="overlay"></div>
						</div>
						<div class="event-content">
							<h4 class="event-title mb30">Is your business ready for a production blockchain rollout?</h4>
							<a href="{{ url('event-detail') }}" class="btn btn--medium btn--transparent btn--secondary">Details</a>
						</div>

						<div class="event-venue mt100">
							<div class="event-date">
								<svg class="woox-icon icon-school-calendar">
									<use xlink:href="svg-icons/sprites/icons.svg#icon-school-calendar"></use>
								</svg>
								March 16, 2018
							</div>
							<div class="event-date">
								<svg class="woox-icon icon-placeholder">
									<use xlink:href="svg-icons/sprites/icons.svg#icon-placeholder"></use>
								</svg>
								Juarez & Associates, 12139 National Boulevard, Los Angeles, CA, U.S.
							</div>
							<div class="author-block">
								<div class="avatar avatar60">
									<img src="assets/author5.jpg" alt="avatar">
								</div>
								<div class="author-content">
									<a href="#" class="author-name">Peter Spenser</a>
									<div class="author-prof">speaker</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 sorting-item">
					<div class="crumina-module crumina-event-item">
						<div class="event-thumb">
							<div class="overlay"></div>
						</div>
						<div class="event-content">
							<h4 class="event-title mb30">What is Bitcoin? A Step-By-Step Guide For Beginners</h4>
							<div class="author-block">
								<div class="avatar avatar60">
									<img src="assets/author1-200.jpg" alt="avatar">
								</div>
								<div class="author-content">
									<a href="#" class="author-name">Frank Godman</a>
									<div class="author-prof">speaker</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 sorting-item">
					<div class="crumina-module crumina-event-item event-item--content-column">
						<div class="event-thumb bg-event7">
							<div class="overlay"></div>
						</div>
						<div class="event-content">
							<a href="#" class="coming-soon-label">Coming Soon</a>
							<h4 class="event-title mt100">Apply them in Your Own Routines</h4>
						</div>
					</div>
				</div>
			</div>

			<div class="row align-center">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<a href="#" class="btn btn--large btn--transparent btn--dark-lighter" id="load-more-button" data-load-link="events-to-load.html" data-container="portfolio-grid">Load More Events</a>
				</div>
			</div>
		</div>
	</section>

</div>
@endsection