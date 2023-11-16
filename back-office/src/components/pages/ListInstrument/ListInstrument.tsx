import React, { FC } from 'react';
import './ListInstrument.scss';
import ButtonGroupList from '../../molecules/ButtonGroupList/ButtonGroupList';
import { useGoNavigate } from '../../../hooks/Navigation';

interface ListInstrumentProps {}

const ListInstrument: FC<ListInstrumentProps> = () => {

  const { navigateTo } = useGoNavigate();

  const handleAdd = () => {
    navigateTo(`/courses/add`);
  };

  const handleDeleteMultiple = async () => {
    // await courseService.courseDeleteMany({ courseIds: courseToDelete });
    window.location.reload();
  };

  return (
  <>
    <ButtonGroupList handleAdd={handleAdd} handleDelete={handleDeleteMultiple} />
  </>
)};

export default ListInstrument;
