@props([
    'type' => 'text',
    'name',
    'placeholder'
])

<input {{ $attributes->merge(['class' => 'form-control input--squared input--dark']) }} type="{{ $type }}"  name="{{ $name }}" placeholder="{{ $placeholder }}">
