<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('front.body');
})->name('home');
Route::get('/contact', function () {
    return view('front.pages.contact');
});
Route::get('/coin-market', function () {
    return view('front.pages.coin-market');
});

Route::get('/events', function () {
    return view('front.pages.events');
});

Route::get('/event-detail', function () {
    return view('front.pages.event-detail');
});
Route::get('/experts', function () {
    return view('front.pages.experts');
});
Route::get('/crypto-currencies', function () {
    return view('front.pages.cryptocurrencies');
});
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});
