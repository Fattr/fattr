require.config
    paths:
        angular: 'vendor/angular/angular'
    baseUrl: '/javascripts'
    shim:
        'angular': {'exports':'angular'}
    priority: ['angular']

require
    urlArgs: "b=#{(new Date()).getTime()}"
    paths:
        jquery: 'vendor/jquery/jquery'
    ,[
        'angular'
        'templates'
        'app/mobile-check'
        'app/app'
    ]
    ,(angular, templates, mobilecheck, app) ->
        $(document).foundation()

        require [
            'app/login/services'
            'app/login/controllers'
            'app/course/services'
            'app/course/controllers'
            'app/course/roster/services'
            'app/course/section/services'
            'app/course/section/controllers'
            'app/course/syllabus/services'
            'app/course/lesson/services'
            'app/course/lesson/controllers'
            'app/course/assignment/services'
            'app/course/assignment/controllers'
            'app/course/assignment/submission/services'
            'app/course/assignment/submission/controllers'
            'app/course/assignment/grade/services'
            'app/course/assignment/grade/controllers'
        ], ->
            isMobile = mobilecheck.isMobile()

            getAllData = (service, $scope, resource) ->
                service.all(resource).getList().then (items) ->
                    $scope[resource] = items

            getTemplate = (name) ->
                template = templates[name]

                if isMobile and templates.hasOwnProperty("#{name}_mobile")
                    template = templates["#{name}_mobile"]
                return template

            app.config ($routeProvider, $locationProvider) ->
                $routeProvider.when '/login', {
                        template: templates['login']
                        controller: 'LoginController'
                }
                $routeProvider.when '/Course/:courseId', {
                        template: templates['course-main']
                        controller: 'CourseController'
                }
                $routeProvider.when '/Course/:courseId/sections/:sectionId', {
                        template: templates['course-main']
                        controller: 'CourseController'
                }
                $routeProvider.when '/Course/:courseId/Lesson/:lessonId', {
                        template: templates['lesson']
                        controller: 'LessonController'
                }
                $routeProvider.when
                '/Course/:courseId/Lesson/:lessonId/assignment', {
                        template: templates['assignment']
                        controller: 'AssignmentController'
                }
                #$routeProvider.when
                #'/Course/:courseId/Lesson/:lessonId/assignment/submission', {
                #        template: templates['submission']
                #        controller: 'AssignmentSubmissionController'
                #}
                #$routeProvider.when '/Course/:courseId/Lesson/:lessonId/assignment/grade', {
                #        template: templates['grades']
                #        controller: 'GradeController'
                #}
                $routeProvider.when '/Students', {
                        template: templates['students']
                        controller: 'StudentController'
                }
                $routeProvider.otherwise {
                        template: getTemplate('main-screen') #templates['main-screen']
                        controller: 'ArchangelController'
                }
                $locationProvider.html5Mode(true)

            angular.module('djangoApp.controllers') #, ['restangular', 'djangoApp.services'])
                .controller 'NavbarController', ($scope,$location,$localStorage,Restangular, BASE_URL, User, Course) ->
                    $scope.$storage = $localStorage.$default {useLocalData: true}
                    $scope.isMobile = isMobile
                    $scope.user = User

                    # $scope.useLocalData = $localStorage.useLocalData
                    $scope.updateDataURL = () ->
                        $scope.$storage.useLocalData = !$scope.$storage.useLocalData

                        url = 'http://localhost:8000'
                        unless $scope.$storage.useLocalData
                            url = 'http://django-archangel.rhcloud.com'

                        Restangular.setBaseUrl "#{url}/"

                        $location.path('/')

                .controller 'ArchangelController', ($scope, Restangular, User, Course) ->
                    $scope.isMobile = isMobile

                    unless isMobile
                        getAllData(Restangular, $scope, 'users')
                        # getAllData(Restangular, $scope, 'upcoming-assignments')


                .controller 'StudentController', ($scope, $route, $routeParams, $location, Restangular) ->
                    getAllData(Restangular, $scope, 'students')


            angular.bootstrap document, ['djangoApp']
