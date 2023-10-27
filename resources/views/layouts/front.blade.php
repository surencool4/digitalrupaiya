<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>Digital Rupaiya</title>

	<link rel="stylesheet" type="text/css" href="css/plugins.min.css">
	<link rel="stylesheet" type="text/css" href="css/theme-styles.min.css">
	<link rel="stylesheet" type="text/css" href="css/blocks.min.css">
	<link rel="stylesheet" type="text/css" href="css/widgets.min.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700i,900," rel="stylesheet">

</head>

<body class="crumina-grid">
    @include('front.preloader')
    @include('front.header')
    @yield("body")
    @include('front.footer')

    <script src="{{ asset('js/method-assign.js') }}"></script>
    <script src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
    <script src="{{ asset('js/map-shortcode.js') }}"></script>
    <script src="{{ asset('js/js-plugins/crum-mega-menu.js') }}"></script>
    <script src="{{ asset('js/theme-plugins.js') }} "></script>
    <script src="{{ asset('js/js-plugins/isotope.pkgd.min.js') }}"></script>
    <script src="{{ asset('js/js-plugins/ajax-pagination.js') }}"></script>
    <script src="{{ asset('js/js-plugins/swiper.min.js') }}"></script>
    <script src="{{ asset('js/js-plugins/material.min.js') }}"></script>
    <script src="{{ asset('js/js-plugins/orbitlist.js') }}"></script>
    <script src="{{ asset('js/js-plugins/bootstrap-datepicker.js') }}"></script>
    <script defer src="{{ asset('fonts/fontawesome-all.js') }}"></script>
    <script src="{{ asset('js/main.js') }}"></script>

    @yield('script')
</body>
</html>