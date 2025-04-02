<button {{ $attributes->merge([
        'class' => 'btn btn--large btn--primary',
        'type' => 'submit'
    ]) }} >
    {{ $slot }}
</button>