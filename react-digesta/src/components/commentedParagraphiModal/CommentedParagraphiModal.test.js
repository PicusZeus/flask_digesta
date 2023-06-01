import {render, screen} from "../../../test-utils";
import CommentedParagraphiModal from "./CommentedParagraphiModal";
import user from "@testing-library/user-event"

const onClose = jest.fn();
const onCloseMobileMenu = jest.fn();
const mockedDispatch = jest.fn();
const mockedNavigate = jest.fn();
describe('CommentedParagraphiModal', () => {

    test('renders without crashing', () => {
        render(
            <CommentedParagraphiModal commentedParagraphi={[]} onClose={onClose} onCloseMobileMenu={onCloseMobileMenu}/>
        );
    });

//     test('calls the correct functions on button click', () => {
//
//         const commentedParagraphi = [
//             {id: 1, lex: {id: 1, titulus: {book: {book_nr: 1}, number: 1}, lex_nr: 1}, key: 'pr'},
//         ];
//
//         render(
//             <CommentedParagraphiModal commentedParagraphi={commentedParagraphi} onClose={onClose}
//                                       onCloseMobileMenu={onCloseMobileMenu}/>
//         );
//
//         user.click
//         fireEvent.click(getByText('1.1.1'));
//
//         expect(uiActions.setActiveSection).toHaveBeenCalledWith('digestaNav');
//         expect(onClose).toHaveBeenCalled();
//         expect(onCloseMobileMenu).toHaveBeenCalledWith(false);
//         expect(mockedNavigate).toHaveBeenCalledWith('/digesta/1/1');
//     });
// });
//
// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(),
// }));
//
// jest.mock('react-redux', () => ({
//   useDispatch: jest.fn(),
// }));
//

//
// beforeEach(() => {
//   jest.clearAllMocks();
//   useDispatch.mockReturnValue(mockedDispatch);
//   useNavigate.mockReturnValue(mockedNavigate);
// });
//
})