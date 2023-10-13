<?php

namespace App\Controller;

use App\Entity\Course;
use App\Entity\Instrument;
use App\Entity\User;
use App\Entity\Composer;
use App\Entity\Category;
use App\Repository\CategoryRepository;
use App\Repository\ComposerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use App\Repository\CourseRepository;
use App\Repository\UserRepository;
use App\Repository\InstrumentRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
#[Route('/api')]
class CourseController extends AbstractController
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/courses', name: 'course_list', methods: ['GET'])]
    public function getCourseList(CourseRepository $courseRepository, SerializerInterface $serializer): JsonResponse
    {
        $coursesList = $courseRepository->findAll();

        $serializedCourses = $serializer->serialize($coursesList, 'json', ['groups' => ['course','course_users', 'course_professor', 'course_composers', 'course_instruments', 'instrument', 'course_category', 'category', 'quizz_course', 'quizz']]);

        return new JsonResponse($serializedCourses, 200, [], true);

    }

    #[Route('/courses/{courseId}', name: 'course_by_id', methods: ['GET'])]
    public function getCourseById(int $courseId, CourseRepository $courseRepository, SerializerInterface $serializer): JsonResponse
    {
        $course = $courseRepository->find($courseId);

        if (!$course) {
            return new JsonResponse(['message' => 'Course not found'], 404);
        }

        $serializedCourse = $serializer->serialize($course, 'json', ['groups' => ['course', 'course_users', 'course_professor', 'course_composers', 'course_comments', 'course_instruments', 'instrument', 'course_category', 'category'], 'datetime_format' => 'Y-m-d H:i:s']);

        return new JsonResponse($serializedCourse, 200, [], true);

    }

    #[Route('/courses/users/{userId}', name: 'course_list_by_user', methods: ['GET'])]
    public function getCourseListByUser(int $userId, CourseRepository $courseRepository, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $user = $userRepository->find($userId);

        if (!$user) {
            return new JsonResponse(['message' => 'User not found'], 404);
        }

        $courses = $courseRepository->findByUser($user);

        $serializedCourses = $serializer->serialize($courses, 'json', ['groups' => ['course','course_users', 'course_professor', 'course_composers', 'course_instruments', 'instrument', 'quizz_course']]);

        return new JsonResponse($serializedCourses, 200, [], true);

    }

    #[Route('/courses/professors/{profId}', name: 'course_list_by_prof', methods: ['GET'])]
    public function getCourseListByProf(int $profId, CourseRepository $courseRepository, UserRepository $userRepository, SerializerInterface $serializer): JsonResponse
    {
        $user = $userRepository->find($profId);

        if (!$user) {
            return new JsonResponse(['message' => 'Professor not found'], 404);
        }

        $courses = $courseRepository->findByProf($user);

        $serializedCourses = $serializer->serialize($courses, 'json', ['groups' => ['course','course_users', 'course_professor', 'course_composers' ,'course_instruments' , 'instrument']]);

        return new JsonResponse($serializedCourses, 200, [], true);

    }

    #[Route('/courses/instruments/{instrumentId}', name: 'course_list_by_instrument', methods: ['GET'])]
    public function getCourseListByInstrument(int $instrumentId, CourseRepository $courseRepository, InstrumentRepository $instrumentRepository, SerializerInterface $serializer): JsonResponse
    {
        $instrument = $instrumentRepository->find($instrumentId);

        if (!$instrument) {
            return new JsonResponse(['message' => 'Instrument not found'], 404);
        }

        $courses = $courseRepository->findByInstrument($instrument);

        $serializedCourses = $serializer->serialize($courses, 'json', ['groups' => ['course','course_users', 'course_professor', 'course_composers']]);

        return new JsonResponse($serializedCourses, 200, [], true);

    }


    #[Route('/courses/category/{categoryID}', name: 'course_list_by_instrument', methods: ['GET'])]
    public function getCourseListByCategory(int $categoryID, CourseRepository $courseRepository, CategoryRepository $categoryRepository , SerializerInterface $serializer): JsonResponse
    {
        $category = $categoryRepository->find($categoryID);

        if (!$category ) {
            return new JsonResponse(['message' => 'Category not found'], 404);
        }

        $courses = $courseRepository->findByCategory($category);

        $serializedCourses = $serializer->serialize($courses, 'json', ['groups' => ['course','course_users', 'course_professor', 'course_composers']]);

        return new JsonResponse($serializedCourses, 200, [], true);

    }


    #[Route('/courses/title/{title}', name: 'course_list_by_title', methods: ['GET'])]
    public function getCourseListByTitle(string $title, CourseRepository $courseRepository, SerializerInterface $serializer): JsonResponse
    {
        $courseByTitle = $courseRepository->findByTitle($title);

        if (!$courseByTitle ) {
            return new JsonResponse(['message' => 'Category not found'], 404);
        }

        $serializedCourses = $serializer->serialize($courseByTitle, 'json', ['groups' => ['course','course_users', 'course_professor', 'course_composers']]);

        return new JsonResponse($serializedCourses, 200, [], true);

    }


    #[Route('/courses/search', name: 'course_list_by_title', methods: ['POST'])]
    public function searchCourses (  Request $request, CourseRepository $courseRepository ,ManagerRegistry $doctrine,SerializerInterface $serializer): Response {

        $data = json_decode($request->getContent(),true);
        $user = $data['professorId'];
        $instrumentName = $data['instrumentName'];
        $category = $data['categoryId'];
        $composer = $data['composerId'];
        $title = $data['title'] ? $data['title']  : '';

        $user = $user ? $doctrine->getRepository(User::class)->find($user) : null;
        $instrument = $instrumentName ? $doctrine->getRepository(Instrument::class)->findOneBy(['name' => $instrumentName]) : null;
        $category = $category ? $doctrine->getRepository(Category::class)->find($category) : null;
        $composer = $composer ? $doctrine->getRepository(Composer::class)->find($composer) : null;
        
        $results = $courseRepository->findByCriteria($user, $instrument, $category, $composer, $title);

        if (!$results ) {
            return new JsonResponse(['message' => 'Aucun cours pour ces critères'], 404);
        }
     
        $serializedCourses = $serializer->serialize($results, 'json', ['groups' => ['course', 'course_professor', 'course_category', 'category', 'course_composers' , 'course_composers' ,'course_instruments' , 'instrument']]);

        return new JsonResponse($serializedCourses, 200, [], true);
    }


    #[Route('/courses/composer/{composerID}', name: 'course_list_by_instrument', methods: ['GET'])]
    public function getCourseListBycomposer(int $composerID, CourseRepository $courseRepository, ComposerRepository $composerRepository , SerializerInterface $serializer): JsonResponse
    {
        $composer = $composerRepository->find($composerID);

        if (!$composer ) {
            return new JsonResponse(['message' => 'composer not found'], 404);
        }

        $courses = $courseRepository->findBycomposer($composer);

        $serializedCourses = $serializer->serialize($courses, 'json', ['groups' => ['course','course_users', 'course_professor', 'course_composers']]);

        return new JsonResponse($serializedCourses, 200, [], true);

    }

    #[Route('/new-course', name: 'new_course', methods: ['POST'])]
    public function newCourse(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $course = new Course();
        $course->setCreatedAt(new \DateTimeImmutable());
        $course->setTitle($data['title']);
        $course->setDescription($data['description']);
        $course->setPrice($data['price']);
        $course->setLinkVideo($data['linkVideo']);
        $course->setPreview($data['preview']);
        $course->setPhoto($data['photo']);
        $instrumentId = $data['instrument']['id'];
        $instrument = $this->entityManager->getRepository(Instrument::class)->find($instrumentId);
        if (!$instrument) {
            return new Response("Instrument not found", 404);
        }
        $course->setInstrument($instrument);
        $professorId = $data['professor']['id'];
        $professor = $this->entityManager->getRepository(User::class)->find($professorId);
        if (!$professor) {
            return new Response("Professor not found", 404);
        }
        $course->setProfessor($professor);
        foreach($data['composer'] as $value){
            $composerId = $value['id'];
            $composer = $this->entityManager->getRepository(Composer::class)->find($composerId);
            if (!$composer) {
                return new Response("Composer not found", 404);
            }
            $course->addComposer($composer);
        }
        foreach($data['category'] as $value){
            $categoryName = $value['name'];
            $category = $this->entityManager->getRepository(Category::class)->findOneBy(['name' => $categoryName]);
            if (!$category) {
                return new Response("Category not found", 404);
            }
            $course->addCategory($category);
        }
        $this->entityManager->persist($course);
        $this->entityManager->flush();

        return new Response('Course created successfully', Response::HTTP_CREATED);

    }

    #[Route('/courses/{courseId}', name: 'course_update', methods: ['PUT'])]
    public function updateCourse(int $courseId, CourseRepository $courseRepository, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $course = $courseRepository->find($courseId);

        if (!$course) {
            return new JsonResponse(['message' => 'Course not found'], 404);
        }

        $course->setUpdatedAt(new \DateTimeImmutable());
        $course->setTitle($data['title']);
        $course->setDescription($data['description']);
        $course->setPrice($data['price']);
        $course->setLinkVideo($data['linkVideo']);
        $course->setPreview($data['preview']);

        $instrumentId = $data['instrument']['id'];
        $instrument = $this->entityManager->getRepository(Instrument::class)->find($instrumentId);
        if (!$instrument) {
            return new Response("Instrument not found", 404);
        }
        $course->setInstrument($instrument);
        $professorId = $data['professor']['id'];
        $professor = $this->entityManager->getRepository(User::class)->find($professorId);
        if (!$professor) {
            return new Response("Professor not found", 404);
        }
        $course->setProfessor($professor);
        foreach($data['composer'] as $value){
            $composerId = $value['id'];
            $composer = $this->entityManager->getRepository(Composer::class)->find($composerId);
            if (!$composer) {
                return new Response("Composer not found", 404);
            }
            $course->addComposer($composer);
        }
        foreach($data['category'] as $value){
            $categoryName = $value['name'];
            $category = $this->entityManager->getRepository(Category::class)->findOneBy(['name' => $categoryName]);
            if (!$category) {
                return new Response("Category not found", 404);
            }
            $course->addCategory($category);
        }

        $this->entityManager->persist($course);
        $this->entityManager->flush();

        return new Response('Course updated successfully', Response::HTTP_OK);
        
    }

    #[Route('/courses/{courseId}', name: 'course_delete', methods: ['DELETE'])]
    public function deleteCourse(int $courseId, CourseRepository $courseRepository, Request $request): Response
    {
        $course = $courseRepository->find($courseId);

        if (!$course) {
            return new JsonResponse(['message' => 'Course not found'], 404);
        }

        $courseRepository->remove($course, true);

        return new Response('Course deleted successfully', Response::HTTP_OK);
    }

}
