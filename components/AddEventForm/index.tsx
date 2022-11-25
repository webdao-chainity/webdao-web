import React, {useState} from 'react';
import styled, {css, withTheme} from 'styled-components';
import {FLEX_ROW_BETWEEN} from '@/constants';
import {Button} from '@/components';

interface IAddEventForm {
  className: string;
  onSubmitForm: (arg0: any) => void;
  blocking?: boolean;
}

const AddEventFormComp = (props: IAddEventForm) => {
  const [data, setData] = useState({
    currency: '0x6EE856Ae55B6E1A249f04cd3b947141bc146273c',
    isPublic: true,
    feeListing: 1,
    voteWeightPerOne: 1,
    whitelists: [],
  });

  const updateData = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={props.className}>
      <div className="form_wrapper">
        <h1>Add event</h1>
        <form>
          <div className="input_item">
            <div className="name_key">Name</div>
            <div className="input_wrapper">
              <input type="text" placeholder={'Enter name'} name="name" onChange={updateData} />
            </div>
          </div>
          <div className="input_item">
            <div className="name_key">Description</div>
            <div className="input_wrapper">
              <textarea
                placeholder={'Enter description'}
                name="description"
                onChange={updateData}
              />
            </div>
          </div>
          {/*<div className="input_item">*/}
          {/*    <div className="name_key">Currency</div>*/}
          {/*    <div className="input_wrapper">*/}
          {/*        <textarea placeholder={'Enter currency'} name='currency' onChange={updateData}/>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div className="input_item">
            <div className="name_key">Total capacity</div>
            <div className="input_wrapper">
              <input
                type="number"
                placeholder={'Enter total capacity'}
                name="totalCap"
                onChange={updateData}
                min={1}
              />
            </div>
          </div>
          <div className="input_item">
            <div className="name_key">Min voter</div>
            <div className="input_wrapper">
              <input
                type="number"
                placeholder={'Enter min voter'}
                name="minVoter"
                onChange={updateData}
                min={0}
              />
            </div>
          </div>
          <div className="input_item">
            <div className="name_key">Max voter</div>
            <div className="input_wrapper">
              <input
                type="number"
                placeholder={'Enter max voter'}
                name="maxVoter"
                min={1}
                onChange={updateData}
              />
            </div>
          </div>
          <div className="input_item">
            <div className="name_key">Start time</div>
            <div className="input_wrapper">
              <input
                type="datetime-local"
                placeholder={'Enter start time'}
                name="startTime"
                onChange={updateData}
              />
            </div>
          </div>
          <div className="input_item">
            <div className="name_key">End time</div>
            <div className="input_wrapper">
              <input
                type="datetime-local"
                placeholder={'Enter end time'}
                name="endTime"
                onChange={updateData}
              />
            </div>
          </div>
        </form>
        <Button
          name="Submit"
          onClick={() => {
            props.onSubmitForm(data);
          }}
        />
      </div>
    </div>
  );
};

export const AddEventForm = withTheme(
  styled(AddEventFormComp)(() => {
    return css`
      .form_wrapper {
        padding: 2rem;
        border: 1px solid #888;
        border-radius: 1.6rem;

        .input_item {
          ${FLEX_ROW_BETWEEN};
          align-items: center;
          padding: 1rem 0;

          .name_key {
            width: 20%;
            font-size: 1.6rem;
          }

          .input_wrapper {
            flex-grow: 1;

            input {
              padding: 1rem;
              border: None;
              color-scheme: dark;
              border-radius: 1rem;
              width: 90%;
            }

            textarea {
              padding: 1rem;
              border: None;
              color-scheme: dark;
              border-radius: 1rem;
              width: 90%;
            }
          }
        }
      }
    `;
  })
);
