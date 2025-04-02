@extends('layouts.front')

@section("body")
<div class="main-content-wrapper">
	<section data-settings="particles-1" class="main-section crumina-flying-balls particles-js bg-1">
		<div class="container">
			<div class="row medium-padding120 align-center">
				<div class="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
					<header class="crumina-module crumina-heading heading--h2 heading--with-decoration">
						<div class="heading-sup-title">CONTACTS</div>
						<h2 class="heading-title heading--half-colored">Contact informations</h2>
						<div class="heading-text">Investigationes demonstraverunt lectores legere elementum pulvinar etiam non quam lacus suspendisse risus nec feugiat in laoreet sit amet cursus.</div>
					</header>
					<a data-scroll href="#details" class="btn btn--large btn--primary">Contact Details</a>
				</div>
			</div>
		</div>
	</section>

	<section>
		<div class="container-fluid">
			<div class="row medium-padding120">
				<div id="details" class="col-lg-8 col-md-8 col-sm-12 col-xs-12 no-padding" data-mh="equal-block">
					<!-- Google map -->
					<div class="google-map height-730" data-map-style="[
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
]" data-locations="795 South Park Avenue, Melbourne, Australia" data-zoom="16" data-map-type="roadmap" data-custom-marker="{{  asset('assets/marker-google.png') }}">
						<div class="block-location-info">
							<header class="crumina-module crumina-heading heading--h2 heading--with-decoration custom-color c-white">
								<h2 class="heading-title">We’re here</h2>
							</header>
							<h6 class="adress">795 South Park Avenue, Melbourne, Australia</h6>
						</div>
						<div class="map-canvas"></div>
					</div>

					<!-- End Google map -->
				</div>

				<div class="col-lg-3 col-lg-offset-1 col-md-4 col-sm-12 col-xs-12 d-flex-align-middle mt30" data-mh="equal-block">

					<div>
						<header class="crumina-module crumina-heading heading--h3 heading--with-decoration">
							<h3 class="heading-title heading--half-colored">Contact <b>details</b></h3>
							<div class="heading-text">Odio aenean sed adipiscing placerat in egestas erat imperdiet.</div>
						</header>

						<div class="contact-item">
							<h4 class="contact-item-title">Find us</h4>
							<div class="info-wrap">
								<div class="info">795 South Park Avenue,</div>
								<span>Melbourne, Australia</span>
							</div>
						</div>

						<div class="contact-item" data-mh="equal-block">
						<h4 class="contact-item-title">Contact us</h4>
						<div class="info-wrap">
							<div class="info">Phone: <span>8 800 567.890.11</span></div>
							<div class="info">Email: <a href="mailto:support@woox.com">support@woox.com</a></div>
						</div>
						<ul class="socials socials--double-icons">
							<li class="social-item">
								<a href="#">
									<i class="fab fa-twitter woox-icon"></i>
								</a>
							</li>

							<li class="social-item">
								<a href="#">
									<i class="fab fa-dribbble woox-icon"></i>
								</a>
							</li>

							<li class="social-item">
								<a href="#">
									<i class="fab fa-instagram woox-icon"></i>
								</a>
							</li>

							<li class="social-item">
								<a href="#">
									<i class="fab fa-facebook-square woox-icon"></i>
								</a>
							</li>
						</ul>
					</div>
					</div>

				</div>

			</div>
		</div>
	</section>

	<section>
		<div class="container">
			<div class="row pb120">
				<div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
					<header class="crumina-module crumina-heading heading--h2 heading--with-decoration">
						<h2 class="heading-title heading--half-colored">If you are interested in working with us, <b class="c-color">please get in touch</b></h2>
						<div class="heading-text">Iaculis nunc sed augue lacus viverra vitae congue. Sagittis orci a scelerisque lobortis mattis.</div>
					</header>
				</div>
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<form class="contact-form" >
                        @csrf
						<div class="row">
							<div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
								<div class="form-group label-floating">
									<label class="input-label control-label">What is your name? <abbr class="required" title="required">*</abbr></label>
									<x-forms.input name="name" placeholder="Name" />
								</div>
								<div class="form-group label-floating">
									<label class="input-label control-label">Your email address <abbr class="required" title="required">*</abbr></label>
									<x-forms.input type="email" name="email" placeholder="Email" />
								</div>
								<div class="form-group label-floating">
									<label class="input-label control-label">Subject</label>
									<x-forms.input type="text" name="subject" placeholder="Subject" />
								</div>
							</div>
							<div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
								<div class="form-group label-floating">
									<label class="input-label control-label">Write your message here</label>
									<textarea class="form-control input--squared input--dark height-170" name="message" placeholder=""></textarea>
								</div>
								<x-forms.primary-button>
									Send a message
								</x-forms.primary-button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>

</div>

@endsection

@section("script")
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDpqPQbjKiY7zSvLyPRIWWOfG1XiuhhYg"></script>
@stop