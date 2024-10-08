import React from "react";

const Test = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.2"
      viewBox="0 0 19 23"
      width="20"
      height="24"
      className={className}

    >
      <defs>
        <image
          width="19"
          height="23"
          id="img1"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAXCAYAAADpwXTaAAAAAXNSR0IArs4c6QAAAjFJREFUOE+dlMurTlEYxn+PS1JG7pJLDN0ywFBMmbgnA2QglEvmyH/gUi6hM3CIgYkwwUEJRZkYSCknDFzP6aDzxfHaz7b2Z599ztk+Vq32bq93/faz3vdZryJiJTCKPyPSq0rfqq+O8XRMEddQRBwEhtdsbHWpz7AxCWbgMGAr8AW4VEOZBqwBHqbp0DBsEtArqTv/ErEf+Czp3FCwiJgC7ABuSbpbxBl2AOiU1BYRVrY7KXxUo2wssAjokNRRhh0CXks6k2C7gAktJmoAzAUw7GyC7QW+AudrgNOBjYMpq8L2AV2G1+RsBrANuCPpdvmYZZg9syctHpFUeK4fNyLmA2uB65Jc0XwUPsuPmarpki8Ajkt6N5i6iNgAzAGOSXpfhh0G3ko6mWATgZ3OI3BRkvPXHBGxEFgFPJV0pbxmZeuAj+WzR8QSYAVg7z3O7PIJGAnMBuYBb4ALknr6wWqS7KMuzY47vhTzE3iWeeyapG/VvXWXOY+NiMnJd41koQGQZs5qlI1ON6EP8PSPR6RnQ9KPvyqLiJnAcmBqylN1j+3iRvAEuC/Jin9bo1KpZYCnNzxPBajCrM4/HOfCpYrnFmrCSkZ8AVyV1FWTAjeEucBq4ANwStL3HJbupJ3v8h+V1DsUqHKSxZl13KlvSHpQwCzZsJuS7rUCSiLc7t3/XklqL2CzgC1ZLtokvWwVloDb8y4rnS5gdvbm/4S54yLpRAFzf1oPXJbU+Y/KNiVY+y+ko+/rRBdT8gAAAABJRU5ErkJggg=="
        />
      </defs>
      <style></style>
      <use id="Layer 16" href="#img1" transform="matrix(1,0,0,1,0,0)" />
    </svg>
  );
};

export default Test;
