import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    console.log(numPages);

    // Page 1, there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupNextButton(curPage);
    }
    // Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupPrevButton(curPage);
    }
    // Other page
    if (this._data.page < numPages) {
      return this._generateMarkupPrevButton(curPage).concat(
        this._generateMarkupNextButton(curPage)
      );
    }
    // Page 1, no other pages
    return '';
  }

  _generateMarkupNextButton(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
  }

  _generateMarkupPrevButton(curPage) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>`;
  }
}

export default new PaginationView();
