import React, { FC } from 'react';
import './CoursesList.scss';
import CardCourse from '../../components/molecules/CardCourse/CardCourse';
import { base, fr, en, Faker } from '@faker-js/faker';

interface CoursesListProps {}

const CoursesList: FC<CoursesListProps> = () => {
  // Applique la langue française et anglais    
  const faker = new Faker({
    locale: [ fr, en, base],
  });

  // Apllique le faker
  const createRandomUser = () => {
    return {
      id: faker.number.int({ max: 100}),
      photo: faker.image.url(),
      imgAlt: faker.word.words(2),
      title: faker.word.words(3),
      ratingScore: faker.number.int({ max: 5 }),
      preview: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      professorName: `${faker.person.firstName()} ${faker.person.lastName()}`
    };
  }

  const datas = faker.helpers.multiple(createRandomUser, {
    count: 6,
  })

  return (      
      <ul className='all-courses'>
        {datas.map((value, index) => (
          <li key={index} >
            <CardCourse
              id={value.id}
              imgSrc={value.photo}
              imgAlt="Cours de Violon"
              title={value.title}
              rating={value.ratingScore}
              shortDescription={value.preview}
              longDescription={value.description}
              professorName={value.professorName}
              />
          </li>
        ))}
        </ul>
  );

}

export default CoursesList;
