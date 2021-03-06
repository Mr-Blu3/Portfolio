<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit29a3186f1ed150ab2e7aa139f99ef02c
{
    public static $prefixLengthsPsr4 = array (
        'S' =>
        array (
            'Symfony\\Component\\EventDispatcher\\' => 34,
        ),
        'K' =>
        array (
            'KeenIO\\' => 7,
        ),
        'C' =>
        array (
            'Composer\\Installers\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Symfony\\Component\\EventDispatcher\\' =>
        array (
            0 => __DIR__ . '/..' . '/symfony/event-dispatcher',
        ),
        'KeenIO\\' =>
        array (
            0 => __DIR__ . '/..' . '/keen-io/keen-io/src',
        ),
        'Composer\\Installers\\' =>
        array (
            0 => __DIR__ . '/..' . '/composer/installers/src/Composer/Installers',
        ),
    );

    public static $prefixesPsr0 = array (
        'G' =>
        array (
            'Guzzle\\Tests' =>
            array (
                0 => __DIR__ . '/..' . '/guzzle/guzzle/tests',
            ),
            'Guzzle' =>
            array (
                0 => __DIR__ . '/..' . '/guzzle/guzzle/src',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit29a3186f1ed150ab2e7aa139f99ef02c::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit29a3186f1ed150ab2e7aa139f99ef02c::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit29a3186f1ed150ab2e7aa139f99ef02c::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
