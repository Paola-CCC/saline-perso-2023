import React, { FC, useEffect, useState } from 'react';
import './ComposersItem.scss';
import ButtonGroupItem from '../../../molecules/ButtonGroupItem/ButtonGroupItem';
import { useGoNavigate } from '../../../../hooks/Navigation';
import { useParams } from 'react-router-dom';
import { composersService } from '../../../../services/Courses/ComposersService';

interface ComposersItemProps {}

const ComposersItem: FC<ComposersItemProps> = () => {

  const { navigateTo } = useGoNavigate();
  const { Id } = useParams();

  const initialState : any = {
   id: '',
   fullName: '' ,
   biography: "",
   coursesNmbrs: null
  };

  const [ composerItems, setComposerItems] = useState(initialState);

  useEffect(() => {
    if(Id && Id !== '') {
      const loadDatas = async () => {
        let datas = await composersService.composersShowById(Id);

        setComposerItems((valuesBefore: any) =>  ({ ...valuesBefore ,
          id: datas?.id,
          fullName: datas?.fullName ,
          biography: datas?.biography,
          instrumentName : datas.instrument[0]?.name,
          coursesNmbrs: datas?.courses?.length
        }))
      };
      loadDatas();
    }
  },[Id])

  const handleUpdate = () => {
    navigateTo(`/composers/${Id}/edit`);
  };

  const handleDelete = async() => {
    let response = await composersService.composersDelete(Id);
    if( response && response.status >= 200 ) {
      navigateTo(`/composers`);
    }
  };

  return (
    <>
        <ButtonGroupItem handleUpdate={handleUpdate} handleDelete={handleDelete} />

      <div className='container-item-course'>
          <div className='zone-media'>
            { (
              <div className='media img'>
                  <img src={"https://ecoledemusiquedegerardmer.e-monsite.com/medias/images/hadi-karimi-ludwig-1.jpg"} alt="" className="card-img" />
              </div>
            )}

            <div className='course-heading'>

              <div className="infos-professors-area">
                <h3> {composerItems?.fullName} </h3>
                <div className="text-area">
                  <p> {composerItems?.instrumentName} </p>
                  <p> {composerItems?.coursesNmbrs} cours associés</p>
                </div>
              </div>

            </div>
          </div>

          <div className='zone-datas'>
              <div className='informations'> 
                <p> {composerItems?.biography} </p>
              </div>
          </div>
      </div>
    </>
)};

export default ComposersItem;
