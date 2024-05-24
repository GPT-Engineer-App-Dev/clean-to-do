import React, { useState } from "react";
import {
  Container,
  VStack,
  HStack,
  Input,
  Button,
  Checkbox,
  Text,
  IconButton,
  StackDivider,
  Box,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (taskText.trim() !== "") {
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <HStack w="100%">
          <Input
            placeholder="Enter a new task"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <Button onClick={addTask} colorScheme="teal">
            Add Task
          </Button>
        </HStack>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          borderColor="gray.200"
          borderWidth="2px"
          borderRadius="md"
          p={4}
          w="100%"
          alignItems="stretch"
        >
          {tasks.length === 0 ? (
            <Text align="center">No tasks added yet.</Text>
          ) : (
            tasks.map((task, index) => (
              <HStack key={index} justifyContent="space-between">
                <Checkbox
                  isChecked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                >
                  <Text as={task.completed ? "s" : undefined}>{task.text}</Text>
                </Checkbox>
                <IconButton
                  aria-label="Delete task"
                  icon={<FaTrash />}
                  onClick={() => deleteTask(index)}
                />
              </HStack>
            ))
          )}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;