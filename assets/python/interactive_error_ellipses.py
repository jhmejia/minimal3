def random_2D_cov():
    """
    Generate a random 2D covariance matrix
    """
    import numpy as np
    import numpy.random as npr
    import scipy.linalg as la

    # Generate a random 2x2 covariance matrix
    # (the matrix must be positive definite)
    A = npr.rand(2, 2)
    C = np.dot(A, A.T)

    # Generate a random rotation matrix
    # (the matrix must be orthogonal)
    A = npr.rand(2, 2)
    Q, R = la.qr(A)

    # The covariance matrix is Q C Q^T
    return np.dot(Q, np.dot(C, Q.T))

cov = random_2D_cov()
print(cov)