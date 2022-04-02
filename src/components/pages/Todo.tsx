import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import React, {FC, ReactElement, useCallback, useEffect, useState} from 'react';
import {Text, TextStyle, View} from 'react-native';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore';
import {formatDistance, subDays} from 'date-fns';

import {Button} from '../uis/Button';
import CheckBox from '../uis/CheckBox';
import {EditText} from '../uis/EditText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LoadingIndicator} from '../uis/LoadingIndicator';
import {RootStackNavigationProps} from '../navigations/RootStackNavigator';
import {fbt} from 'fbt';
import firebase from 'firebase/app';
import {firestore} from '../../App';
import {getPromotedProductIOS} from 'react-native-iap';
import produce from 'immer';
import styled from 'styled-components/native';
import {useAuthContext} from '../../providers/AuthProvider';
import {useTheme} from '../../providers/ThemeProvider';
import {withScreen} from '../../utils/wrapper';

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  background-color: ${({theme}) => theme.background};

  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
                    flex: 1,
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
        <Text
          style={[
            {
              color: theme.text,
            },
            todo.done && {...textDoneStyle},
          ]}>
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
  const [loading, setLoading] = useState<boolean>(true);

  const {theme} = useTheme();

  const {
    state: {user},
    setUser,
  } = useAuthContext();

  const setInitialTodos = useCallback(async (): Promise<void> => {
    if (user) {
      const todoRef = collection(firestore, `users/${user.uid}/todos`);
      const q = query(todoRef);
      const snap = await getDocs(q);

      const initialTodos: TodoType[] = [];

      type TodoDocType = Omit<TodoType, 'id' | 'createdAt'> & {
        createdAt: Timestamp;
      };

      for (const snapDoc of snap.docs) {
        const todoData: TodoDocType = snapDoc.data() as TodoDocType;

        const todo: TodoType = {
          ...todoData,
          id: snapDoc.id,
          initialText: todoData.text,
          createdAt: todoData?.createdAt?.toDate(),
        };

        initialTodos.push(todo);
      }

      setTodos(sortTodos(initialTodos));
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setInitialTodos();
  }, [setInitialTodos]);

  const addTodo = useCallback(async (): Promise<void> => {
    if (!text) {
      return;
    }

    if (user) {
      const createdAt = new Date();

      const todoRef = collection(firestore, `users/${user.uid}/todos`);

      const added = await addDoc(todoRef, {
        text,
        done: false,
        createdAt: Timestamp.fromDate(createdAt),
      });

      const todo: TodoType = {
        id: added.id,
        text,
        initialText: text,
        done: false,
        createdAt,
      };

      setTodos([todo, ...todos]);
      setText('');
    }
  }, [text, todos, user]);

  const renderInput = (): ReactElement => {
    return (
      <View
        style={{
          marginTop: 16,
          marginBottom: 12,
          marginHorizontal: 12,
          width: '100%',
          paddingHorizontal: 12,

          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <EditText
          value={text}
          onChangeText={(e) => setText(e)}
          placeholder={fbt('Add todo...', 'add todo').toString()}
          style={{
            borderWidth: 1,
            paddingVertical: 2,
            width: '100%',
            borderColor: theme.accent,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          styles={{
            container: {
              height: '100%',
              width: '100%',
              borderBottomWidth: 0,
            },
            input: {
              fontSize: 14,
              paddingRight: 80,
              paddingLeft: 12,
            },
            hovered: {
              borderBottomWidth: 0,
            },
          }}
          onSubmitEditing={addTodo}
        />
        <Button
          style={{
            position: 'absolute',
            right: 20,
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
      {loading && <LoadingIndicator />}
      {!loading && (
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

                if (user) {
                  const todoRef = doc(
                    firestore,
                    `users/${user.uid}/todos/${item.id}`,
                  );

                  setDoc(todoRef, {done: !item.done}, {merge: true});

                  const nextState = produce(todos, draft => {
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

                if (user) {
                  const todoRef = doc(
                    firestore,
                    `users/${user.uid}/todos/${item.id}`,
                  );

                  setDoc(todoRef, {text: item.text}, {merge: true});

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

                if (user) {
                  const todoRef = doc(
                    firestore,
                    `users/${user.uid}/todos/${item.id}`,
                  );

                  deleteDoc(todoRef);

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
      )}
    </Container>
  );
};

export default withScreen(Todo);
