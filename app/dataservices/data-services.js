(function() {

    var app = angular.module("myFrontend");

    app.factory('DataService', ["$http", "$rootScope", "$log", "$location", "$cacheFactory",
        function($http, $rootScope, $log, $location, $cacheFactory) {

            var host = $location.host();
            var api_url = "";
            var gUser = null;
            var firebaseAPIUrl = "http://69.16.231.161:8880/"
                //var firebaseAPIUrl = "https://us-central1-authuser-a90fb.cloudfunctions.net/";
                //var firebaseAPIUrl = "http://localhost:5002/authuser-a90fb/us-central1/";
                //$log.log("host=",host,host.indexOf('192.168.33.22'));
            if (host.indexOf('192.168.33.22') > -1) {
                api_url = "/videoant"
            } else {
                api_url = "/videoant"
            }

            var cacheVideos = [];
            var cachePopular = null;
            var cacheLatest = [];

            var ref = firebase.database().ref();
            var videosRef = ref.child('tmdb').child('videos');

            var loginUserInfo = function() {
                return firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        $rootScope.loginUser = user.email;
                        $rootScope.uid = user.uid;
                    }
                    return user;
                })
            }

            var getTMDBVideosPage = function(page) {
                videosRef.orderByChild('title').limitToLast(40).once('value').then(function(snap) {
                    return snap.val();
                }).catch(function(err) {
                    console.error(err);
                    return {};
                });
            }

            var getVideo20s = function() {

            }

            var getLatestVideos = function() {
                console.log('it called');
                var api_url = firebaseAPIUrl + "getLatestVideos"
                return $http.get(api_url)
                    .then(function(res) {
                        //console.log('results', res);
                        return res.data;
                    });
            };

            var getPopularVideos = function() {
                if (cachePopular == 0) {
                    console.log('PcachePopular is NULL')
                    videosRef.orderByChild('vote_count').limitToLast(100).once('value').then(function(snap) {
                        cachePopular = snap.val();
                        return snap.val();
                    }).catch(function(err) {
                        console.error(err);
                        return {};
                    });
                } else {
                    console.log('Pupular Videos NOT NULL');
                    return cachePopular;
                }
            }

            var login = function(email, password) {
                return firebase.auth().signInWithEmailAndPassword(email, password).then(function(res) {
                    console.log('Logged in');
                    return true;
                    //$scope.$apply();
                }).catch(function(err) {
                    alert(err.toString());
                    console.log('Not logged in', err);
                    return false;
                });
            }

            var registerEmailUser = function(email, password, name) {
                return firebase.auth().createUserWithEmailAndPassword(email, password).then(function(res) {
                    $rootScope.loginUser = email;
                    $rootScope.uid = res.uid;
                    registerUser(name, email, res.uid);
                    return res;
                }).catch(function(err) {
                    console.error(err.toString());
                    return -1;
                })
            }
            var getVideoAnnotationsFB = function(uid, vid) {
                //var ref = firebase.database().ref();
                var usersDataRef = ref.child('usersData');
                var timelinesRef = usersDataRef.child('timelines');
                var uidRef = timelinesRef.child(uid);
                var vidRef = uidRef.child(vid);
                console.log(uid, vid);
                return vidRef.once('value').then(function(snap) {
                    var data = snap.val();
                    var keys = data ? Object.keys(data) : [];
                    var res = [];
                    for (var i = 0; i < keys.length; i++) {
                        var eleData = data[keys[i]];
                        var eleArray = Object.keys(eleData);
                        for (var x = 0; x < eleArray.length; x++) {
                            res.push(eleData[eleArray[x]]);
                        }
                    }
                    return { data: res, total: x };
                });
            }

            var getAllElementsDataFromFirebase = function() {
                //var ref = firebase.database().ref();
                var elementContentRef = ref.child('element_contents');
                return elementContentRef.once('value').then(function(snap) {
                    var data = snap.val();
                    return data;
                }).catch(function(err) {
                    console.error(err.toString());
                    return null;
                });
            }

            var getAllContentsFromFirebase = function() {
                //var ref = firebase.database().ref();
                var videoRef = ref.child('videos');
                return videoRef.once('value').then(function(snap) {
                    var obj = snap.val();
                    var keys = obj ? Object.keys(obj) : [];
                    var result = [];
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        var item = obj[key];
                        //item['id'] = key;
                        result.push(item);
                    }
                    return { "data": result, "total": i };
                }).catch(function(err) {
                    console.log(err.toString());
                });
            }

            var insertVideoAnnotationFirebase = function(uid, element, vid, data) {
                //var ref = firebase.database().ref();
                var usersDataRef = ref.child('usersData');
                var timelineRef = usersDataRef.child('timelines');
                var userKeyRef = timelineRef.child(uid);
                var videoKeyRef = userKeyRef.child(vid);
                var elementRef = videoKeyRef.child(element);
                var key = Date.now(); // md5(element + data['current_time'] + data['element_title'] + data['thumbnail']);
                var keyRef = elementRef.child(key);
                data['now'] = key;
                return keyRef.set(data).then(function(res) {
                    return data;
                }).catch(function(err) {
                    console.error(err.toString());
                    return [];
                });
            }


            var deleteVideoAnnotationFirebase = function(uid, vid, dataItem) {
                //var ref = firebase.database().ref();
                var usersDataRef = ref.child('usersData');
                var timelinesRef = usersDataRef.child('timelines');
                var uidRef = timelinesRef.child(uid);
                var videoKeyRef = uidRef.child(vid);
                var elementRef = videoKeyRef.child(dataItem['elementname']);
                var key = dataItem['now']; // md5(dataItem['elementname'] + dataItem['current_time'] + dataItem['element_title'] + dataItem['thumbnail']);
                var keyRef = elementRef.child(key);
                return keyRef.remove().then(function(res) {
                    return key;
                });
            }


            var onAuthStateChanged = function($rootScope) {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        $rootScope.loginUser = user.email;
                        $rootScope.uid = user.uid;
                        $rootScope.$broadcast("changeLogStatus", { uid: user.uid, email: user.email });
                    } else {
                        $rootScope.loginUser = null;
                        $rootScope.uid = null;
                    }
                    //return user;
                });
            }

            var registerUser = function(name, email, uid) {
                //var ref = firebase.database().ref();
                var usersRef = ref.child('users');
                var userUidRef = usersRef.child(uid);
                var user = {
                    name: name,
                    email: email,
                };
                userUidRef.set(user);
            }

            var getUser = function() {
                return gUser;
            }

            var setUser = function(user) {
                gUser = user;
            }

            var getFirebaseData = function(rootRef) {
                //var ref = firebase.database().ref();
                var logRef = ref.child('services');
                logRef.once('value', function(snap) {
                    console.log(snap.val());
                    return snap.val();
                });
            }

            var getAllCategories = function() {

                var api_url = firebaseAPIUrl + "getAllCategories"
                return $http.get(api_url)
                    .then(function(res) {
                        return res;
                    });

                //var ref = firebase.database().ref();
                /*var categoriesRef = ref.child('tmdb').child('only_categories');
                return categoriesRef.once('value').then(function(snap) {
                    var keys = Object.keys(snap.val());
                    var res = [];
                    for (var i = 0; i < keys.length; i++) {
                        res.push({ name: keys[i], id: i });
                    }
                    return { data: res, total: i };
                });*/
            };
            /*
            var getAllCategories = function() {

                return $http.get(api_url + "/api/getAllCategories/")
                    .then(function(response) {
                        return response;
                    });
            }
            */
            var getAllContents = function(id) {
                var url = api_url + "/api/getAllContents";
                //  return  $http.get(api_url+"/rest/public/api/v1/video/"+id)
                return $http.get(url)
                    .then(function(response) {
                        $log.log(response);
                        return response;
                    });
            }


            var getContent = function(id) {
                /*var url = api_url + "/api/getContent/" + id;
                return $http.get(url)
                    .then(function(response) {
                        $log.log(response);
                        return response;
                    });
                    */
                var videoRef = firebase.database().ref().child('tmdb').child('videos').child(id);
                //var videoRef = firebase.database().ref().child('ozeedb').child('all_movies').child(id);
                return videoRef.once('value').then(function(snap) {
                    return snap.val();
                })
            };


            var getElementContents = function(id) {
                var api_url = "/videoant/api/getElementContents/";
                return $http.get(api_url + id)
                    .then(function(response) {
                        //   $log.log(response);
                        return response;
                    });
            }

            var getElementContentsByElement = function(id) {
                var api_url = "/videoant/api/getElementContentsByElement/";
                return $http.get(api_url + id)
                    .then(function(response) {
                        //   $log.log(response);
                        return response;
                    });
            }

            var insertAnnotation = function(data) {
                var url = api_url + "/api/insertAnnotation";
                return $http.post(url, { data: data })
                    .then(function(response) {
                        $log.log(response);
                        return response;
                    });
            }

            var deleteAnnotation = function(id) {
                var url = api_url + "/api/deleteAnnotation";
                $log.log("deleteAnnotation url", url);
                return $http.post(url, { data: id })
                    .then(function(response) {
                        $log.log("deleteAnnotation successfully");
                        return response;
                    });
            }

            // Delete element content by ID
            var deleteElementContent = function(id) {
                var api_url = "/videoant/api/deleteElementContent/";
                return $http.get(api_url + id)
                    .then(function(response) {
                        $log.log(response);
                        return response;
                    });
            };

            // Delete element content by ID
            var deleteElementContentFB = function(key, element_type) {
                // TODO: need to remove the thumbnsil from z5 server
                //var ref = firebase.database().ref();
                var ecRef = ref.child('element_contents');
                var eRef = ecRef.child(element_type);
                var keyRef = eRef.child(key);
                return keyRef.remove().then(function(res) {
                    return res;
                });
            };

            // Insert a element to firebase content
            var insertElementContentFB = function(data) {
                var api_url = "/videoant/api/insertElementContentFB";
                return $http.post(api_url, { data: data })
                    .then(function(res) {
                        var ref = firebase.database().ref();
                        var ecRef = ref.child('element_contents');
                        var eRef = ecRef.child(res.data['element_type']);
                        var key = md5(res.data['element_type'] + res.data['name']);
                        var keyRef = eRef.child(key);
                        console.log('key', key);
                        keyRef.set(res.data);
                        return res;
                    });
            };

            // Insert a element content
            var insertElementContent = function(data) {
                var api_url = "/videoant/api/insertElementContent";
                return $http.post(api_url, { data: data })
                    .then(function(response) {
                        $log.log(response);
                        return response;
                    });
            };

            // Upload youtube videos
            var uploadYoutubeVideo = function(data) {
                var api_url = "/videoant/api/uploadYoutubeVideo";
                return $http.post(api_url, { data: data })
                    .then(function(response) {
			$log.log('You are here');
                        $log.log(response.data.data);
                        var data = response.data.data;
                        var key = md5(data.title);
                        var overview = data['short_description'];
                        delete data['short_description'];
                        data['overview'] = overview;
                        data['bg_sm_url'] = data['thumbnail'];
                        delete data['thumbnail'];
                        data['id'] = key;
                        data['videoUrl'] = data['video_path'];
                        data['content_type'] = 'Youtube';
                        var keyRef = ref.child('tmdb').child('videos').child(key);
                        console.log('key is', key);
                        keyRef.set(data);
                        return response;
                    });
            };

            // Upload youtube videos
            var uploadUrlVideo = function(data) {
                var url = api_url + "/api/uploadUrlVideo";
                return $http.post(url, { data: data })
                    .then(function(response) {
                        $log.log(response);
                        return response;
                    });
            };

            // Upload videos
            var uploadVideo = function(data) {
                var url = api_url + "/api/uploadVideo";
                return $http.post(url, { data: data })
                    .then(function(response) {
                        $log.log(response);
                        return response;
                    });
            };


            // Temp
            var getContentByCat = function() {
                var url = 'http://192.168.33.22/rest/public/api/v1/content';
                return $http.get(url)
                    .then(function(response) {
                        return response;
                    });
            }

            // Temp: add elements contents to firebase
            var loadElementContentToFB = function() {
                //var ref = firebase.database().ref();
                var elementContentRef = ref.child('element_contents');
                var elements = ['VR']; //'AR', 'Smell', 'Touch 3D', 'VR', 'Print 3D'];
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    getElementContents(element).then(function(res) {
                        var elementRef = elementContentRef.child(element);
                        var data = res.data;
                        console.log(element);
                        for (var j = 0; j < data.total; j++) {
                            var item = data.data[j];
                            var key = md5(item['element_type'] + item['name']);
                            var keyRef = elementRef.child(key);
                            keyRef.set(item);
                            console.log('res', item);
                        }
                    });
                }
                return 'True';
            }

            // Temp: add categories to firebase
            var loadCategoriesToFB = function() {
                //var ref = firebase.database().ref();
                var categoriesRef = ref.child('categories');
                getAllCategories().then(function(res) {
                    var data = res.data.data;
                    for (var i = 0; i < data.length; i++) {
                        var categoryRef = categoriesRef.child(data[i]['name']);
                        categoryRef.set(data[i]);
                    }
                });
                return 'True';
            }

            // Temp: Load all video contents to firebase

            var loadContentsToFB = function() {
                var url = api_url + "/api/getAllContents";
                //  return  $http.get(api_url+"/rest/public/api/v1/video/"+id)
                return $http.get(url)
                    .then(function(res) {
                        //console.log('res1', res);
                        //var ref = firebase.database().ref();
                        var videosRef = ref.child('videos');
                        var data = res.data.data;
                        for (var i = 0; i < data.length; i++) {
                            var key = md5(data[i]['title'] + data[i]['genre'] + data[i]['video_path']);
                            var keyRef = videosRef.child(key);
                            keyRef.set(data[i]);
                        }
                        return res;
                    });
            }

            var getEmotions = function(vid) {
                //var ref = firebase.database().ref();
                var vidRef = firebase.database().ref().child('emotions').child("123");
                return vidRef.once('value').then(function(res) {
                    return res.val();
                }).catch(function(err) {
                    console.log(err.toString());
                    return null;
                });
            }

            var getVideoURL = function(videoURL) {
                var api_url = firebaseAPIUrl + "getVideoURL?video=" + videoURL
                return $http.get(api_url)
                    .then(function(res) {
                        console.log('results', res);
                        return res.data;
                    });
            }

            return {

                getAllContents: getAllContents,
                getContent: getContent,
                getAllCategories: getAllCategories,
                insertAnnotation: insertAnnotation,
                deleteAnnotation: deleteAnnotation,
                getElementContents: getElementContents,
                deleteElementContent: deleteElementContent,
                insertElementContent: insertElementContent,
                login: login,
                uploadYoutubeVideo: uploadYoutubeVideo,
                uploadUrlVideo: uploadUrlVideo,
                uploadVideo: uploadVideo,
                getUser: getUser,
                setUser: setUser,
                getFirebaseData: getFirebaseData,
                getContentByCat: getContentByCat,
                onAuthStateChanged: onAuthStateChanged,
                registerEmailUser: registerEmailUser,
                registerUser: registerUser,
                insertVideoAnnotationFirebase: insertVideoAnnotationFirebase,
                getVideoAnnotationsFB: getVideoAnnotationsFB,
                deleteVideoAnnotationFirebase: deleteVideoAnnotationFirebase,
                getAllContentsFromFirebase: getAllContentsFromFirebase,
                myCache: $cacheFactory('myCache'),
                loadElementContentToFB: loadElementContentToFB,
                getAllElementsDataFromFirebase: getAllElementsDataFromFirebase,
                insertElementContentFB: insertElementContentFB,
                deleteElementContentFB: deleteElementContentFB,
                loadContentsToFB: loadContentsToFB,
                loadCategoriesToFB: loadCategoriesToFB,
                getPopularVideos: getPopularVideos,
                getLatestVideos: getLatestVideos,
                loginUserInfo: loginUserInfo,
                getEmotions: getEmotions,
                getVideoURL: getVideoURL
            };
        }
    ]);


}());
