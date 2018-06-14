import React from "react";

class GetStars extends React.Component {
  render() {
    return (
      <div className="inline">
        {this.props.rating === 10 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
          </span>
        ) : null}

        {this.props.rating < 10 && this.props.rating > 9.45 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star half icon star_gold" />
          </span>
        ) : null}

        {this.props.rating <= 9.45 && this.props.rating >= 8.95 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating < 8.95 && this.props.rating > 8.45 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star half icon star_gold" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 8.45 && this.props.rating > 7.95 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 7.95 && this.props.rating > 7.45 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star half icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 7.45 && this.props.rating > 6.95 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 6.95 && this.props.rating > 6.45 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star half icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 6.45 && this.props.rating > 5.95 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 5.95 && this.props.rating > 5.45 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star half icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 5.45 && this.props.rating > 4.95 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 4.95 && this.props.rating > 4.45 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star half icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 4.45 && this.props.rating > 3.95 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 3.95 && this.props.rating > 3.45 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star half icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 3.45 && this.props.rating > 2.95 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 2.95 && this.props.rating > 2.45 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star half icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 2.45 && this.props.rating >= 1.95 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}

        {this.props.rating <= 1.95 && this.props.rating > 1.45 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star half icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}
        {this.props.rating <= 1.45 ? (
          <span>
            <i className="star icon star_gold" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
            <i className="star outline icon" />
          </span>
        ) : null}
      </div>
    );
  }
}

export default GetStars;
