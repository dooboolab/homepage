import {Button, EditText, useTheme} from 'dooboo-ui';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import React, {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {Text, TextStyle, View} from 'react-native';
import {formatDistance, subDays} from 'date-fns';

import CheckBox from '../uis/CheckBox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import firebase from 'firebase';
import {getPromotedProductIOS} from 'react-native-iap';
import produce from 'immer';
import styled from 'styled-components/native';
import {useAuthContext} from '../../providers/AuthProvider';
import {withScreen} from '../../utils/wrapper';

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}): string => theme.background};

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type TodoType = {
  id: string;
  done?: boolean;
  text: string;
  initialText: string;
  createdAt: Date;
};

type TodoListProps = {
  todo: TodoType;
  onChangeText?: (str: string) => void;
  onDoneChecked?: () => void;
  onEditPressed?: () => void;
  onDeletePressed?: () => void;
};

const sortTodos = (todos: TodoType[]): TodoType[] => {
  return todos
    .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
    .sort((a, b) => Number(a.done) - Number(b.done));
};

const TodoList: FC<TodoListProps> = ({
  todo,
  onChangeText,
  onDoneChecked,
  onEditPressed,
  onDeletePressed,
}) => {
  const {theme} = useTheme();
  const hasTextChanged = todo.text !== todo.initialText;

  const textDoneStyle: Partial<TextStyle> = {
    textDecorationColor: theme.negative,
    textDecorationStyle: 'double',
    textDecorationLine: 'line-through',
  };

  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <View
        style={{
          alignSelf: 'stretch',

          flexDirection: 'row',
        }}>
        <CheckBox
          checked={todo.done}
          onPress={onDoneChecked}
          renderElement={() => (
            <EditText
              style={{
                flex: 1,
                alignSelf: 'stretch',

                alignItems: 'center',
              }}
              editable={!todo.done}
              value={todo.text}
              onChangeText={onChangeText}
              styles={{
                container: {
                  alignSelf: 'stretch',
                  borderBottomWidth: 0,
                  borderWidth: 0,

                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                },
                input: [
                  {
                    color: theme.text,
                    fontSize: 14,
                    alignSelf: 'stretch',
                  },
                  todo.done && {...textDoneStyle},
                ],
              }}
            />
          )}
        />
        <TouchableOpacity onPress={onEditPressed}>
          <View
            style={{
              padding: 8,
            }}>
            {hasTextChanged && (
              <Icon
                name="check"
                size={30}
                color={theme.text}
                style={{
                  fontSize: 24,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeletePressed}>
          <View
            style={{
              padding: 8,
            }}>
            <Icon
              name="delete"
              size={30}
              color={theme.text}
              style={{
                fontSize: 24,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginLeft: 32,
          marginBottom: 8,
        }}>
        <Text style={todo.done && {...textDoneStyle}}>
          {formatDistance(todo.createdAt, new Date(), {
            addSuffix: true,
          })}
        </Text>
      </View>
    </View>
  );
};

type Props = {
  navigation: RootStackNavigationProps<'Todo'>;
};

const Todo: FC<Props> = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      title: fbt('Todo', 'todo').toString(),
    });
  }, [navigation]);

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [text, setText] = useState<string>('');

  const {theme} = useTheme();

  const {
    state: {user},
    setUser,
  } = useAuthContext();

  const setInitialTodos = useCallback(async (): Promise<void> => {
    const db = firebase.firestore();

    if (user) {
      const snap = await db
        .collection('users')
        .doc(user.uid)
        .collection('todos')
        .get();

      const initialTodos: TodoType[] = [];

      type TodoDocType = Omit<TodoType, 'id' | 'createdAt'> & {
        createdAt: firebase.firestore.Timestamp;
      };

      for (const doc of snap.docs) {
        const todoData: TodoDocType = doc.data() as TodoDocType;

        const todo: TodoType = {
          ...todoData,
          id: doc.id,
          initialText: todoData.text,
          createdAt: todoData?.createdAt?.toDate(),
        };

        initialTodos.push(todo);
      }

      setTodos(sortTodos(initialTodos));
    }
  }, [user]);

  useEffect(() => {
    setInitialTodos();
  }, [setInitialTodos]);

  const addTodo = useCallback(async (): Promise<void> => {
    if (!text) return;

    const db = firebase.firestore();

    if (user) {
      const createdAt = new Date();

      const added = await db
        .collection('users')
        .doc(user.uid)
        .collection('todos')
        .add({
          text,
          done: false,
          createdAt: firebase.firestore.Timestamp.fromDate(createdAt),
        });

      const todo: TodoType = {
        id: added.id,
        text,
        initialText: text,
        done: false,
        createdAt,
      };

      setTodos([todo, ...todos]);
    }
  }, [text, todos, user]);

  const renderInput = (): ReactElement => {
    return (
      <View
        style={{
          alignSelf: 'stretch',
          marginTop: 16,
          marginBottom: 12,
          marginHorizontal: 12,
        }}>
        <EditText
          value={text}
          onChangeText={(e) => setText(e)}
          placeholder={fbt('Add todo...', 'add todo').toString()}
          style={{
            borderWidth: 1,
            borderColor: theme.accent,
          }}
          styles={{
            input: {
              fontSize: 14,
              paddingRight: 80,
              paddingLeft: 12,
            },
          }}
          onSubmitEditing={addTodo}
        />
        <Button
          style={{
            position: 'absolute',
            top: 5,
            right: 8,
          }}
          text={fbt('Add', 'add')}
          onPress={addTodo}
        />
      </View>
    );
  };

  return (
    <Container>
      {renderInput()}
      <FlatList
        style={{alignSelf: 'stretch'}}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          alignSelf: 'stretch',
          paddingHorizontal: 16,
        }}
        data={todos}
        renderItem={({item}) => (
          <TodoList
            todo={item}
            onDoneChecked={async () => {
              const index = todos.findIndex((el) => el.id === item.id);

              const db = firebase.firestore();

              if (user) {
                await db
                  .collection('users')
                  .doc(user.uid)
                  .collection('todos')
                  .doc(item.id)
                  .set({done: !item.done}, {merge: true});

                const nextState = produce(todos, (draft) => {
                  draft[index] = item;
                  draft[index].done = !item.done;
                  draft[index].text = draft[index].initialText;
                  draft = sortTodos(draft);
                });

                setTodos(nextState);
              }
            }}
            onEditPressed={async () => {
              const index = todos.findIndex((el) => el.id === item.id);
              const db = firebase.firestore();

              if (user) {
                await db
                  .collection('users')
                  .doc(user.uid)
                  .collection('todos')
                  .doc(item.id)
                  .set({text: item.text}, {merge: true});

                const nextState = produce(todos, (draft) => {
                  draft[index] = item;
                  draft[index].initialText = item.text;
                });

                setTodos(nextState);
              }
            }}
            onChangeText={async (str: string) => {
              const index = todos.findIndex((el) => el.id === item.id);

              const nextState = produce(todos, (draft) => {
                draft[index] = item;
                draft[index].text = str;
              });

              setTodos(nextState);
            }}
            onDeletePressed={async () => {
              const index = todos.findIndex((el) => el.id === item.id);

              const db = firebase.firestore();

              if (user) {
                await db
                  .collection('users')
                  .doc(user.uid)
                  .collection('todos')
                  .doc(item.id)
                  .delete();

                const nextState = produce(todos, (draft) => {
                  draft[index] = item;
                  draft.splice(index, 1);
                });

                setTodos(nextState);
              }
            }}
          />
        )}
      />
    </Container>
  );
};

export default withScreen(Todo);
