import React, { useState } from 'react';
import { Checkbox, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const formatTime = (time) => {
  return time.toString().padStart(2, '0');
};

const generateSlots = (index) => {
    const slots = [];
    let startHour = index;
    let endHour = index ;
    let minute = 0;
  
    while (minute < 60) {
      const startTime = `${formatTime(startHour)}.${formatTime(minute)}`;
  
      if (minute + 20 > 60) {
        endHour++;
        minute = (minute + 20) % 60;
      }
      else {
        minute += 20;
      }
      const endTime = `${formatTime(endHour)}.${formatTime(minute)}`;
      slots.push({ time: `${startTime} to ${endTime}`, checked: false });
    }
    return slots;
  };
  

const SlotsTable = () => {
  const [slots, setSlots] = useState(Array(24).fill().map((_, index) => ({ slots: generateSlots(index), rate: getRandomRate() })));

  const handleCheckboxChange = (index, slotIndex) => {
    const updatedSlots = [...slots];
    updatedSlots[index].slots[slotIndex].checked = !updatedSlots[index].slots[slotIndex].checked;
    setSlots(updatedSlots);
  };

  const calculateSum = () => {
    let sum = 0;
    slots.forEach((slot) => {
      slot.slots.forEach((s) => {
        if (s.checked) {
          sum += slot.rate;
        }
      });
    });
    return sum;
  };

  return (
    <Table  colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Time</Th>
          <Th>Rate</Th>
          <Th>Slot 1</Th>
          <Th>Slot 2</Th>
          <Th>Slot 3</Th>
        </Tr>
      </Thead>
      <Tbody>
        {slots.map((slot, index) => (
          <Tr key={index}>
            <Td>{`${formatTime(index)}.00`}</Td>
            <Td>{slot.rate}</Td>
            {slot.slots.map((s, slotIndex) => (
              <Td key={slotIndex}>
                <Checkbox
                  isChecked={s.checked}
                  isDisabled={s.checked}
                  onChange={() => handleCheckboxChange(index, slotIndex)}
                />
                <span>{s.time}</span>
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
      <tfoot>
        <Tr>
          <Th colSpan={2}>Total</Th>
          <Th>{calculateSum()}</Th>
        </Tr>
      </tfoot>
    </Table>
  );
};

const getRandomRate = () => {
  return Math.floor(Math.random() * 10) + 1;
};

export default SlotsTable;
