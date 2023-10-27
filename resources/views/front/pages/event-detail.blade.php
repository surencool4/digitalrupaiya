@extends('layouts.front')

@section('body')

<div class="main-content-wrapper">
	<section data-settings="particles-1" class="main-section crumina-flying-balls particles-js bg-1 medium-padding120">
		<div class="container">
			<div class="row align-center mb60">
				<div class="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
					<header class="crumina-module crumina-heading heading--h2 heading--with-decoration">
						<div class="heading-sup-title">EVENTS</div>
						<h2 class="heading-title heading--half-colored">Is your business ready for a production blockchain rollout?</h2>
						<div class="heading-text">Investigationes demonstraverunt lectores legere elementum.</div>
					</header>
					<a data-scroll href="#details" class="btn btn--large btn--secondary btn--transparent">Details</a>
				</div>
			</div>
		</div>
	</section>

	<section class="pt80">
		<div class="container">
			<div id="details" class="row">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div class="event-details-thumb bg-event8">
						<div class="overlay"></div>
						<div class="crumina-countdown-item">
							<div class="crumina-countdown" data-date="2019-01-01 00:00:00"></div>
						</div>

						<div class="event-venue event-venue--details has-popup">
							<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-12" data-mh="equal-height">
									<div class="event-date">
										<svg class="woox-icon icon-school-calendar">
											<use xlink:href="svg-icons/sprites/icons.svg#icon-school-calendar"></use>
										</svg>
										March 16, 2023
									</div>
									<div class="event-date">
										<svg class="woox-icon icon-placeholder">
											<use xlink:href="svg-icons/sprites/icons.svg#icon-placeholder"></use>
										</svg>
										Juarez & Associates, 12139 National Boulevard, Los Angeles, CA, U.S.
									</div>
								</div>

								<div class="col-lg-3 col-md-6 col-sm-12" data-mh="equal-height">
									<div class="event-date">
										<svg class="woox-icon icon-circular-clock">
											<use xlink:href="svg-icons/sprites/icons.svg#icon-circular-clock"></use>
										</svg>
										7:30 PM to 9:30 PM
									</div>
									<div class="event-date">
										<svg class="woox-icon icon-telephone">
											<use xlink:href="svg-icons/sprites/icons.svg#icon-telephone"></use>
										</svg>
										8 800 567.890.11 (Mon-Fri 9am-6pm)
									</div>
								</div>

								<div class="col-lg-3 col-md-6 col-sm-12" data-mh="equal-height">
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
								<div class="col-lg-2 col-md-6 col-sm-12" data-mh="equal-height">
									<a href="#" class="btn btn--medium btn--primary btn--transparent btn--with-icon btn--icon-right js-open-popup js-body-overlay">
										Join Now
										<svg class="woox-icon icon-arrow-right"><use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-right"></use></svg>
									</a>
									<div class='window-popup register-event'>
										<div class="mCustomScrollbar" data-mcs-theme="dark">
											<div class='content'>
												<a class='js-open-popup js-body-overlay popup-close' href='#'>
													<svg class="woox-icon icon-close"><use xlink:href="svg-icons/sprites/icons.svg#icon-close"></use></svg>
												</a>
												<form class="register-form form--dark"  action="#">
                                                    @csrf
													<header class="crumina-module crumina-heading heading--h2 heading--with-decoration">
														<h2 class="heading-title">Register</h2>
														<p>* All fields are required</p>
													</header>
													<div class="form-group label-floating is-empty">
														<label class="input-label control-label">Name <abbr class="required" title="required">*</abbr></label>
														<input class="form-control input--squared input--dark" name="name" type="text">
													</div>
													<div class="form-group label-floating is-empty">
														<label class="input-label control-label">Email Address <abbr class="required" title="required">*</abbr></label>
														<input class="form-control input--squared input--dark" type="email" value="">
													</div>
													<div class="form-group label-floating is-empty">
														<label class="input-label control-label">Phone Number <abbr class="required" title="required">*</abbr></label>
														<input class="form-control input--squared input--dark" type="text" value="">
													</div>
													<div class="form-group label-floating is-empty">
														<label class="input-label control-label">Company Name <abbr class="required" title="required">*</abbr></label>
														<input class="form-control input--squared input--dark" type="text" value="">
													</div>

													<div class="checkbox checkbox--style3">
														<label>
															<input type="checkbox" name="optionsCheckboxes10" checked>
															I agree with the all additional
															<a class="link-underlined" href="#">Terms and Conditions</a>
														</label>
													</div>

													<button class="btn btn--large btn--green-light btn--with-icon btn--icon-right full-width">
														SUBSCRIBE NOW
														<svg class="woox-icon icon-arrow-right"><use xlink:href="svg-icons/sprites/icons.svg#icon-arrow-right"></use></svg>
													</button>
												</form>
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

	</section>

	<section class="medium-padding120">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
					<header class="crumina-module crumina-heading heading--h3 heading--with-decoration">
						<h3 class="heading-title">Event description</h3>
						<div class="heading-text">Investigationes demonstraverunt lectores legere elementum pulvinar
							etiam non quam lacus suspendisse risus nec feugiat in fermentum laoreet sit amet cursus
							quam adipiscing vitae proin sagittis.
						</div>
					</header>
					<p>Iaculis nunc sed augue lacus viverra vitae congue. Sagittis orci a scelerisque purus semper eget
						duis at. Quis auctor elit sed vulputate mi sit. Nunc non blandit massa enim nec dui nunc mattis.
						Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Orci ac auctor augue mauris augue neque.
						Felis eget velit aliquet sagittis id consectetur. In mollis nunc sed id semper. Augue mauris augue
						neque gravida in fermentum et sollicitudin. Amet risus nullam eget felis eget nunc lobortis mattis aliquam.
					</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ipsum faucibus vitae aliquet nec ullamcorper. Eget aliquet nibh
						praesent tristique magna sit amet. Erat imperdiet sed euismod nisi porta lorem.
					</p>
					<div class="tabs tabs--style5">
						<ul role="tablist">
							<li role="presentation" class="tab-control active">
								<a href="#tab-32" role="tab" data-toggle="tab" class="control-item">
									<h6 class="tab-title">Day 1 <span>Mon, March 16, 2018</span></h6>
								</a>
							</li>
							<li role="presentation" class="tab-control">
								<a href="#tab-33" role="tab" data-toggle="tab" class="control-item">
									<h6 class="tab-title">Day 2 <span>Mon, March 17, 2018</span></h6>
								</a>
							</li>
							<li role="presentation" class="tab-control">
								<a href="#tab-34" role="tab" data-toggle="tab" class="control-item">
									<h6 class="tab-title">Day 3 <span>Mon, March 18, 2018</span></h6>
								</a>
							</li>
						</ul>
						<div class="tab-content">
							<div role="tabpanel" class="tab-pane fade active" id="tab-32">
								<ul class="lessons__list">
									<li class="lessons__item">

										<div class="lessons__time">
											<svg class="woox-icon icon-circular-clock">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-circular-clock"></use>
											</svg>
											3:00 PM to 6:00 PM
										</div>

										<div class="lessons__body">
											<div class="lessons-content">

												<a href="#" class="h4 lessons-title">Ipsum faucibus vitae nec ullamcorper</a>

												<p class="lessons-text">Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.
													Claritas est etiam processus dynamicus, qui sequitur mutationem
													consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc
													putamus parum claram, anteposuerit litterarum formas humanitatis per seacula qui mutationem consuetudium.
												</p>

												<div class="author-block">
													<div class="avatar avatar60">
														<img src="assets/author2.jpg" alt="avatar">
													</div>
													<div class="author-content">
														<a href="#" class="h6 author-name">Philip Demarco</a>
														<div class="author-prof">speaker</div>
													</div>
												</div>
											</div>
										</div>
									</li>
									<li class="lessons__item">

										<div class="lessons__time">
											<svg class="woox-icon icon-circular-clock">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-circular-clock"></use>
											</svg>
											7:00 PM to 8:00 PM
										</div>

										<div class="lessons__body">
											<div class="lessons-content">

												<a href="#" class="h4 lessons-title">Varius morbi enim nunc faucibus</a>

												<p class="lessons-text">Iaculis nunc sed augue lacus viverra vitae congue. Sagittis orci a scelerisque purus semper eget duis at. Quis auctor elit sed vulputate mi sit. Nunc non blandit massa enim nec dui nunc mattis. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque.</p>

												<div class="author-block">
													<div class="avatar avatar60">
														<img src="assets/author5.jpg" alt="avatar">
													</div>
													<div class="author-content">
														<a href="#" class="h6 author-name">Peter Spenser</a>
														<div class="author-prof">speaker</div>
													</div>
												</div>
											</div>
										</div>
									</li>
								</ul>
								<div class="universal-btn-wrap">
									<a href="#" class="btn btn--large btn--secondary btn--transparent">
										Save Event to Calendar
									</a>

									<a href="#" class="btn btn--large btn--primary btn--with-count">
										I am Going
										<span class="count">38</span>
									</a>
								</div>
							</div>
							<div role="tabpanel" class="tab-pane fade" id="tab-33">
								<ul class="lessons__list">
									<li class="lessons__item">

										<div class="lessons__time">
											<svg class="woox-icon icon-circular-clock">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-circular-clock"></use>
											</svg>
											7:00 PM to 8:00 PM
										</div>

										<div class="lessons__body">
											<div class="lessons-content">

												<a href="#" class="h4 lessons-title">Varius morbi enim nunc faucibus</a>

												<p class="lessons-text">Iaculis nunc sed augue lacus viverra vitae congue. Sagittis orci a scelerisque purus semper eget duis at. Quis auctor elit sed vulputate mi sit. Nunc non blandit massa enim nec dui nunc mattis. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque.</p>

												<div class="author-block">
													<div class="avatar avatar60">
														<img src="assets/author5.jpg" alt="avatar">
													</div>
													<div class="author-content">
														<a href="#" class="h6 author-name">Peter Spenser</a>
														<div class="author-prof">speaker</div>
													</div>
												</div>
											</div>
										</div>
									</li>
									<li class="lessons__item">

										<div class="lessons__time">
											<svg class="woox-icon icon-circular-clock">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-circular-clock"></use>
											</svg>
											3:00 PM to 6:00 PM
										</div>

										<div class="lessons__body">
											<div class="lessons-content">

												<a href="#" class="h4 lessons-title">Ipsum faucibus vitae nec ullamcorper</a>

												<p class="lessons-text">Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.
													Claritas est etiam processus dynamicus, qui sequitur mutationem
													consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc
													putamus parum claram, anteposuerit litterarum formas humanitatis per seacula qui mutationem consuetudium.
												</p>

												<div class="author-block">
													<div class="avatar avatar60">
														<img src="assets/author2.jpg" alt="avatar">
													</div>
													<div class="author-content">
														<a href="#" class="h6 author-name">Philip Demarco</a>
														<div class="author-prof">speaker</div>
													</div>
												</div>
											</div>
										</div>
									</li>
								</ul>
								<div class="universal-btn-wrap">
									<a href="#" class="btn btn--large btn--secondary btn--transparent">
										Save Event to Calendar
									</a>

									<a href="#" class="btn btn--large btn--primary btn--with-count">
										I am Going
										<span class="count">38</span>
									</a>
								</div>
							</div>
							<div role="tabpanel" class="tab-pane fade" id="tab-34">
								<ul class="lessons__list">
									<li class="lessons__item">

										<div class="lessons__time">
											<svg class="woox-icon icon-circular-clock">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-circular-clock"></use>
											</svg>
											3:00 PM to 6:00 PM
										</div>

										<div class="lessons__body">
											<div class="lessons-content">

												<a href="#" class="h4 lessons-title">Ipsum faucibus vitae nec ullamcorper</a>

												<p class="lessons-text">Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.
													Claritas est etiam processus dynamicus, qui sequitur mutationem
													consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc
													putamus parum claram, anteposuerit litterarum formas humanitatis per seacula qui mutationem consuetudium.
												</p>

												<div class="author-block">
													<div class="avatar avatar60">
														<img src="assets/author2.jpg" alt="avatar">
													</div>
													<div class="author-content">
														<a href="#" class="h6 author-name">Philip Demarco</a>
														<div class="author-prof">speaker</div>
													</div>
												</div>
											</div>
										</div>
									</li>
									<li class="lessons__item">

										<div class="lessons__time">
											<svg class="woox-icon icon-circular-clock">
												<use xlink:href="svg-icons/sprites/icons.svg#icon-circular-clock"></use>
											</svg>
											7:00 PM to 8:00 PM
										</div>

										<div class="lessons__body">
											<div class="lessons-content">

												<a href="#" class="h4 lessons-title">Varius morbi enim nunc faucibus</a>

												<p class="lessons-text">Iaculis nunc sed augue lacus viverra vitae congue. Sagittis orci a scelerisque purus semper eget duis at. Quis auctor elit sed vulputate mi sit. Nunc non blandit massa enim nec dui nunc mattis. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque.</p>

												<div class="author-block">
													<div class="avatar avatar60">
														<img src="assets/author5.jpg" alt="avatar">
													</div>
													<div class="author-content">
														<a href="#" class="h6 author-name">Peter Spenser</a>
														<div class="author-prof">speaker</div>
													</div>
												</div>
											</div>
										</div>
									</li>
								</ul>
								<div class="universal-btn-wrap">
									<a href="#" class="btn btn--large btn--secondary btn--transparent">
										Save Event to Calendar
									</a>

									<a href="#" class="btn btn--large btn--primary btn--with-count">
										I am Going
										<span class="count">38</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
					<div class="widget w--help bg-help">
						<h3 class="title">How can we <span class="weight-bold">help you?</span></h3>
						<p class="text">
							Sem integer vitae justo eget magna. Eget nullam non nisi est sit amet. Nec ultrices dui sapien eget mi proin egestas egestas.
						</p>
						<a href="#" class="btn btn--large btn--secondary btn--with-icon btn--icon-left">
							<svg class="woox-icon icon-telephone"><use xlink:href="svg-icons/sprites/icons.svg#icon-telephone"></use></svg>
							Contacts
						</a>
					</div>

					<a href="#" class="btn btn--x-large btn--primary btn--transparent btn--with-icon btn--icon-left full-width mb60 mt60">
						<svg class="woox-icon icon-adobe-reader-symbol"><use xlink:href="svg-icons/sprites/icons.svg#icon-adobe-reader-symbol"></use></svg>
						Company Presentation
					</a>

					<div class="widget w--location">
						<!-- Google map -->
						<div class="google-map height-560" data-map-style="[
					{'elementType': 'geometry', 'stylers': [{'color': '#242f3e'}]},
  {'elementType': 'labels.text.stroke', 'stylers': [{'color': '#242f3e'}]},
  {'elementType': 'labels.text.fill', 'stylers': [{'color': '#746855'}]},
  {
    'featureType': 'administrative.locality',
    'elementType': 'labels.text.fill',
    'stylers': [{'color': '#d59563'}]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [{'color': '#d59563'}]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [{'color': '#3d434f'}]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [{'color': '#6b9a76'}]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [{'color': '#666d7a'}]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry.stroke',
    'stylers': [{'color': '#212a37'}]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.text.fill',
    'stylers': [{'color': '#9ca5b3'}]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [{'color': '#746855'}]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.stroke',
    'stylers': [{'color': '#1f2835'}]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels.text.fill',
    'stylers': [{'color': '#f3d19c'}]
  },
  {
    'featureType': 'transit',
    'elementType': 'geometry',
    'stylers': [{'color': '#2f3948'}]
  },
  {
    'featureType': 'transit.station',
    'elementType': 'labels.text.fill',
    'stylers': [{'color': '#d59563'}]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{'color': '#17263c'}]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [{'color': '#515c6d'}]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.stroke',
    'stylers': [{'color': '#17263c'}]
  }
]" data-locations="795 South Park Avenue, Melbourne, Australia" data-zoom="16" data-map-type="roadmap" data-custom-marker="assets/marker-google.png">
							<div class="map-canvas"></div>
						</div>

						<!-- End Google map -->
					</div>
				</div>
			</div>
		</div>
	</section>

</div>

@endsection