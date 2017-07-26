(function(global) {

  var map = {
    'app':                        'client', 
    '@angular':                   'node_modules/@angular',
    'rxjs':                       'node_modules/rxjs',
    'moment':                     'node_modules/moment/moment.js',
    'ng2-bootstrap/ng2-bootstrap': 'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
    'ng2-bs3-modal':              'node_modules/ng2-bs3-modal',
    '@angular/material':          'npm:@angular/material/bundles/material.umd.js',
     "lodash":                     'node_modules/lodash/lodash.js',
    'ng2-file-upload':            'node_modules/ng2-file-upload'
  };

  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'ng2-bootstrap':              { main: 'ng2-bootstrap.js', defaultExtension:'js'},
    'ng2-bs3-modal':              { defaultExtension: 'js' },
    'material':                   { defaultExtension: 'js' },
    "lodash":                      { defaultExtension: 'js' },
    "lodash":                     { defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
  ];

  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);
  
})(this);